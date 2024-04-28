import EntityManager from "./entities/entity-manager.js";
import Player from "./entities/player.js";
import Input from "./systems/input.js";
import Movement from "./systems/movement.js";
import Collision from "./systems/collision.js";
import Shooting from "./systems/shooting.js";
import Enemy from "./systems/enemy.js";
import Lifespan from "./systems/lifespan.js";

import Rendering from "./systems/rendering.js";

const canvas = document.getElementById("canvas");

const entityManager = new EntityManager();

const x = canvas.width / 2 - 32;
const y = canvas.height / 2 - 32;

const player = new Player(x, y);
entityManager.addEntity(player);

const systems = [
  new Input(),
  new Movement(),
  new Collision(entityManager, canvas),
  new Shooting(entityManager, canvas),
  new Enemy(entityManager, canvas),
  new Lifespan(),
  new Rendering(canvas),
];

const mainLoop = (lastTime) => {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;

  entityManager.update();
  systems.forEach((system) => {
    system.update(entityManager.entities, deltaTime);
  });

  requestAnimationFrame(() => mainLoop(currentTime));
};

mainLoop(performance.now());
