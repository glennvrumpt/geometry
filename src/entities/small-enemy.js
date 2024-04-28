import Entity from "../entities/entity.js";
import Transform from "../components/transform.js";
import Shape from "../components/shape.js";
import Lifespan from "../components/lifespan.js";
import Collision from "../components/collision.js";
import Vector2 from "../utils/vector2.js";

class SmallEnemy extends Entity {
  constructor(x, y, dx, dy, radius, sides, color) {
    super();
    this.addComponent(new Transform(new Vector2(x, y), new Vector2(dx, dy), 0));
    this.addComponent(new Shape(radius, sides, color));
    this.addComponent(new Lifespan(0.5));
    this.addComponent(new Collision(radius));
    this.addTag("SmallEnemy");
  }
}

export default SmallEnemy;
