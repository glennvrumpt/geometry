import System from "./system.js";
import EnemyEntity from "../entities/enemy.js";
import SmallEnemy from "../entities/small-enemy.js";
import Vector2 from "../utils/vector2.js";
import { getRandomRGB, getRandomInt } from "../utils/utilities.js";

class Enemy extends System {
  constructor(entityManager, canvas, spawnInterval = 1.5) {
    super();
    this.entityManager = entityManager;
    this.canvas = canvas;
    this.spawnInterval = spawnInterval;
    this.timeSinceLastSpawn = 0;
  }

  update(entities, deltaTime) {
    this.timeSinceLastSpawn += deltaTime;

    if (this.timeSinceLastSpawn >= this.spawnInterval) {
      this.spawnEnemy();
      this.timeSinceLastSpawn = 0;
    }

    entities.forEach((entity) => {
      if (entity.hasTag("enemy") && !entity.active) {
        this.spawnSmallEnemies(entity);
      }
    });
  }

  spawnEnemy() {
    const { width, height } = this.canvas;

    const position = new Vector2(
      getRandomInt(20, width - 20),
      getRandomInt(20, height - 20)
    );

    const angle = Math.random() * 2 * Math.PI;
    const speed = 200;
    const velocity = new Vector2(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );

    const radius = 20;
    const sides = getRandomInt(3, 8);
    const color = getRandomRGB();

    const newEnemy = new EnemyEntity(position, velocity, radius, sides, color);
    this.entityManager.addEntity(newEnemy);
  }

  spawnSmallEnemies(enemy) {
    const shape = enemy.getComponent("Shape");
    const transform = enemy.getComponent("Transform");

    const smallRadius = shape.radius / 2;
    const smallSides = shape.sides;
    const center = transform.position;

    const angleStep = (2 * Math.PI) / smallSides;

    for (let i = 0; i < smallSides; i++) {
      const angle = i * angleStep;
      const velocity = new Vector2(
        Math.cos(angle) * 150,
        Math.sin(angle) * 150
      );

      const smallEnemy = new SmallEnemy(
        center,
        velocity,
        smallRadius,
        smallSides,
        shape.color
      );

      this.entityManager.addEntity(smallEnemy);
    }
  }
}

export default Enemy;
