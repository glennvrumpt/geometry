import Entity from "../entities/entity.js";
import Transform from "../components/transform.js";
import Shape from "../components/shape.js";
import Collision from "../components/collision.js";
import Input from "../components/input.js";
import Score from "../components/score.js";
import Vector2 from "../utils/vector2.js";

class Player extends Entity {
  constructor(x, y) {
    super();
    this.addComponent(new Transform(new Vector2(x, y), new Vector2(0, 0), 0));
    this.addComponent(new Shape(20, 8, "#ff0000"));
    this.addComponent(new Collision(20));
    this.addComponent(new Input());
    this.addComponent(new Score());
    this.addTag("player");
  }
}

export default Player;
