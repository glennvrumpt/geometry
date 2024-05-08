import Entity from "../entities/entity.js";
import Transform from "../components/transform.js";
import Shape from "../components/shape.js";
import Collision from "../components/collision.js";
import Lifespan from "../components/lifespan.js";

class SmallEnemy extends Entity {
  constructor(position, velocity, radius, sides, color) {
    super();
    this.addComponent(new Transform(position, velocity, 0));
    this.addComponent(new Shape(radius, sides, color));
    this.addComponent(new Lifespan(0.5));
    this.addComponent(new Collision(radius));
    this.addTag("small-enemy");
  }
}

export default SmallEnemy;
