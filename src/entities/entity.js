class Entity {
  constructor() {
    this.id = Entity.generateId();
    this.components = {};
    this.tags = new Set();
    this.active = true;
  }

  addComponent(component) {
    this.components[component.constructor.name] = component;
  }

  getComponent(componentName) {
    return this.components[componentName];
  }

  addTag(tag) {
    this.tags.add(tag);
  }

  removeTag(tag) {
    this.tags.delete(tag);
  }

  hasTag(tag) {
    return this.tags.has(tag);
  }

  static generateId() {
    if (!this.currentId) this.currentId = 0;
    return this.currentId++;
  }
}

export default Entity;
