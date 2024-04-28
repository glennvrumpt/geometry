import Component from "./component.js";

class Shape extends Component {
  constructor(radius, sides, color) {
    super();
    this.radius = radius;
    this.sides = sides;
    this.color = color;
  }
}

export default Shape;
