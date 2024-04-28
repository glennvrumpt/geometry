import System from "./system.js";

class Lifespan extends System {
  constructor() {
    super();
  }

  update(entities, deltaTime) {
    for (const entity of Object.values(entities)) {
      const lifespan = entity.getComponent("Lifespan");

      if (lifespan) {
        lifespan.remaining -= deltaTime;

        if (lifespan.remaining <= 0) {
          entity.active = false;
        }
      }
    }
  }
}

export default Lifespan;
