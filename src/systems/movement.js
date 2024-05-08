import System from "./system.js";
import Vector2 from "../utils/vector2.js";

class Movement extends System {
  constructor(playerSpeed = 300, enemySpeed = 200) {
    super();
    this.playerSpeed = playerSpeed;
    this.enemySpeed = enemySpeed;
  }

  update(entities, deltaTime) {
    for (const entity of Object.values(entities)) {
      const transform = entity.getComponent("Transform");
      const input = entity.getComponent("Input");

      if (transform) {
        if (entity.hasTag("player")) {
          this.updatePlayerMovement(transform, input, deltaTime);
        } else {
          this.updateMovement(transform, deltaTime);
        }
      }
    }
  }

  updatePlayerMovement(transform, input, deltaTime) {
    const velocity = new Vector2(0, 0);

    if (input) {
      if (input.keys["w"]) velocity.y = -this.playerSpeed;
      if (input.keys["s"]) velocity.y = this.playerSpeed;
      if (input.keys["a"]) velocity.x = -this.playerSpeed;
      if (input.keys["d"]) velocity.x = this.playerSpeed;
    }

    transform.position = transform.position.add(velocity.multiply(deltaTime));
  }

  updateMovement(transform, deltaTime) {
    transform.position = transform.position.add(
      transform.velocity.multiply(deltaTime)
    );
  }
}

export default Movement;
