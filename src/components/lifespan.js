import Component from "./component.js";

class Lifespan extends Component {
  constructor(duration) {
    super();
    this.remaining = duration;
  }
}

export default Lifespan;
