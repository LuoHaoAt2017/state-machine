import { createMachine, assign, spawn, sendParent } from "xstate";
import uuid from "uuid-v4";

const createTodoMachine = ({ id, title, completed }) =>
  createMachine(
    {
      id: "todo",
      initial: "reading",
      context: {
        id,
        title,
        prevTitle: title,
        completed,
      },
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            assign({ completed: true }),
            sendParent((context) => ({ type: "TODO.COMMIT", todo: context })),
          ],
        },
        DELETE: "deleted",
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
              actions: [assign({ completed: true }), "commit"],
            },
            TOGGLE_COMPLETE: {
              actions: [
                assign({ completed: (context) => !context.completed }),
                "commit",
              ],
            },
            SET_ACTIVE: {
              actions: [assign({ completed: false }), "commit"],
            },
            EDIT: {
              target: "editing",
              actions: "focusInput",
            },
          },
        },
        editing: {
          entry: assign({ prevTitle: (context) => context.title }),
          on: {
            CHANGE: {
              actions: assign({
                title: (_, event) => event.value,
              }),
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context) => ({
                  type: "TODO.COMMIT",
                  todo: context,
                })),
                cond: (context) => context.title.trim().length > 0,
              },
              { target: "deleted" },
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context) => ({
                type: "TODO.COMMIT",
                todo: context,
              })),
            },
            CANCEL: {
              target: "reading",
              actions: assign({ title: (context) => context.prevTitle }),
            },
          },
        },
        deleted: {
          onEntry: sendParent((context) => ({
            type: "TODO.DELETE",
            id: context.id,
          })),
        },
      },
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: "TODO.COMMIT",
          todo: context,
        })),
        focusInput: () => {},
      },
    }
  );

const createTodo = (title) => {
  return {
    id: uuid(),
    title,
    completed: false,
  };
};

export const todosMachine = createMachine({
  id: "todos",
  context: {
    todo: "", // new todo
    todos: [],
    filter: "all",
  },
  initial: "loading",
  states: {
    loading: {
      entry: assign({
        todos: (context) => {
          // "Rehydrate" persisted todos
          return context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo)),
          }));
        },
      }),
      always: "ready",
    },
    ready: {},
  },
  on: {
    "NEWTODO.CHANGE": {
      actions: assign({
        todo: (_, event) => event.value,
      }),
    },
    "NEWTODO.COMMIT": {
      actions: [
        assign({
          todo: "", // clear todo
          todos: (context, event) => {
            const newTodo = createTodo(event.value.trim());
            return context.todos.concat({
              ...newTodo,
              ref: spawn(createTodoMachine(newTodo)),
            });
          },
        }),
        "persist",
      ],
      cond: (_, event) => event.value.trim().length,
    },
    "TODO.COMMIT": {
      actions: [
        assign({
          todos: (context, event) =>
            context.todos.map((todo) => {
              return todo.id === event.todo.id
                ? { ...todo, ...event.todo, ref: todo.ref }
                : todo;
            }),
        }),
        "persist",
      ],
    },
    "TODO.DELETE": {
      actions: [
        assign({
          todos: (context, event) =>
            context.todos.filter((todo) => todo.id !== event.id),
        }),
        "persist",
      ],
    },
    SHOW: {
      actions: assign({
        filter: (_, event) => event.filter,
      }),
    },
    "MARK.completed": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_COMPLETED"));
      },
    },
    "MARK.active": {
      actions: (context) => {
        context.todos.forEach((todo) => todo.ref.send("SET_ACTIVE"));
      },
    },
    CLEAR_COMPLETED: {
      actions: assign({
        todos: (context) => context.todos.filter((todo) => !todo.completed),
      }),
    },
  },
});
