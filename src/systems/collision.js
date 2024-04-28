import System from "./system.js";

class Collision extends System {
  constructor(entityManager, canvas) {
    super();
    this.entityManager = entityManager;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  update(entities) {
    const playerEntities = this.entityManager.getEntitiesByTag("Player");
    const playerEntity = Object.values(playerEntities)[0];
    const playerScore = playerEntity
      ? playerEntity.getComponent("Score")
      : null;

    for (const entity of Object.values(entities)) {
      const transform = entity.getComponent("Transform");
      const collision = entity.getComponent("Collision");

      if (transform && collision) {
        this.handleWallCollision(transform, collision);

        if (entity.hasTag("Enemy") || entity.hasTag("SmallEnemy")) {
          this.checkEntityCollisions(entity, entities, playerScore);
        }
      }
    }
  }

  handleWallCollision(transform, collision) {
    const { position, velocity } = transform;
    const { radius } = collision;

    if (position.x - radius < 0) {
      position.x = radius;
      velocity.x = Math.abs(velocity.x);
    } else if (position.x + radius > this.canvasWidth) {
      position.x = this.canvasWidth - radius;
      velocity.x = -Math.abs(velocity.x);
    }

    if (position.y - radius < 0) {
      position.y = radius;
      velocity.y = Math.abs(velocity.y);
    } else if (position.y + radius > this.canvasHeight) {
      position.y = this.canvasHeight - radius;
      velocity.y = -Math.abs(velocity.y);
    }
  }

  checkEntityCollisions(entity, entities, playerScore) {
    const transform = entity.getComponent("Transform");
    const collision = entity.getComponent("Collision");

    for (const otherEntity of Object.values(entities)) {
      if (otherEntity.hasTag("Bullet") || otherEntity.hasTag("Player")) {
        const otherTransform = otherEntity.getComponent("Transform");

        if (
          this.checkCollision(
            transform,
            otherTransform,
            collision.radius,
            otherEntity.getComponent("Collision").radius
          )
        ) {
          this.handleEntityCollision(entity, otherEntity, playerScore);
        }
      }
    }
  }

  handleEntityCollision(entity, otherEntity, playerScore) {
    if (otherEntity.hasTag("Bullet")) {
      entity.active = false;
      otherEntity.active = false;

      if (playerScore) {
        const enemyShape = entity.getComponent("Shape");
        playerScore.score += enemyShape.sides;
      }
    } else if (otherEntity.hasTag("Player")) {
      entity.active = false;
      this.resetPlayerPosition(otherEntity);
    }
  }

  resetPlayerPosition(playerEntity) {
    const transform = playerEntity.getComponent("Transform");
    transform.position.x = this.canvasWidth / 2;
    transform.position.y = this.canvasHeight / 2;
  }

  checkCollision(transform1, transform2, radius1, radius2) {
    const pos1 = transform1.position;
    const pos2 = transform2.position;

    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < radius1 + radius2;
  }
}

export default Collision;
