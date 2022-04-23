import { createMachine } from "xstate";

const machine = createMachine({
  id: "promise",
  initial: "pending",
  states: {
    pending: {
      on: {
        RESOLVE: {
          target: "resolved",
        },
        REJRCT: {
          target: "rejected",
        },
      },
    },
    resolved: {
      type: "final",
    },
    rejected: {
      type: "final",
    },
  },
});

// interpret(machine).onTransition(function(state) {
//   console.log(state);
// });

export default machine;