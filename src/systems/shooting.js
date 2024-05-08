import System from "./system.js";
import Bullet from "../entities/bullet.js";
import Vector2 from "../utils/vector2.js";

class Shooting extends System {
  constructor(entityManager, canvas) {
    super();
    this.entityManager = entityManager;
    this.canvas = canvas;
    this.mousePosition = new Vector2(0, 0);
    this.cooldown = 0;
    this.fireRate = 0.2;
    this.bulletSpeed = 500;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 0 && this.cooldown <= 0) {
        this.shootBullet();
        this.cooldown = this.fireRate;
      }
    });
  }

  shootBullet() {
    const player = this.entityManager.getEntitiesByTag("player");
    const playerEntity = Object.values(player)[0];

    if (playerEntity) {
      const playerTransform = playerEntity.getComponent("Transform");
      const playerPosition = playerTransform.position;

      const direction = this.mousePosition.subtract(playerPosition).normalize();

      const bulletVelocity = direction.multiply(this.bulletSpeed);

      const bullet = new Bullet(
        playerPosition,
        bulletVelocity,
        6,
        8,
        "#ffffff"
      );

      this.entityManager.addEntity(bullet);
    }
  }

  update(entities, deltaTime) {
    this.cooldown -= deltaTime;
  }
}

export default Shooting;
