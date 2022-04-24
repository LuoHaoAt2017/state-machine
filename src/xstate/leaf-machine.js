import { createMachine } from "xstate";

const statusMachine = createMachine(
  {
    id: "leaves",
    initial: "green",
    context: {
      elapsed: 0,
      direction: "east",
    },
    states: {
      green: {
        /* ... */
      },
      yellow: {
        /* ... */
      },
      red: {
        /* ... */
      },
    },
  },
  {
    actions: {},
    delays: {},
    guards: {},
    services: {},
  }
);
