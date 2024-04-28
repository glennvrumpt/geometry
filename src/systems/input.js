import System from "./system.js";

class Input extends System {
  constructor() {
    super();
    this.keys = {};

    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  update(entities) {
    for (const entity of Object.values(entities)) {
      const input = entity.getComponent("Input");

      if (input) {
        input.keys = { ...this.keys };
      }
    }
  }
}

export default Input;
