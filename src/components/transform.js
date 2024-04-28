import Component from "./component.js";
import Vector2 from "../utils/vector2.js";

class Transform extends Component {
  constructor(
    position = new Vector2(0, 0),
    velocity = new Vector2(0, 0),
    angle = 0
  ) {
    super();
    this.position = position;
    this.velocity = velocity;
    this.angle = angle;
  }
}

export default Transform;