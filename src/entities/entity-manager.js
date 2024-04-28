class EntityManager {
  constructor() {
    this.entities = {};
    this.taggedEntities = {};
    this.pendingEntities = [];
  }

  addEntity(entity) {
    this.pendingEntities.push(entity);
  }

  update() {
    this.pendingEntities.forEach((entity) => {
      this.entities[entity.id] = entity;

      entity.tags.forEach((tag) => {
        if (!this.taggedEntities[tag]) {
          this.taggedEntities[tag] = {};
        }
        this.taggedEntities[tag][entity.id] = entity;
      });
    });

    this.pendingEntities = [];

    for (const id in this.entities) {
      if (!this.entities[id].active) {
        const entity = this.entities[id];

        delete this.entities[id];

        entity.tags.forEach((tag) => {
          delete this.taggedEntities[tag][id];
        });
      }
    }
  }

  getEntitiesByTag(tag) {
    return this.taggedEntities[tag] || {};
  }

  getEntityById(id) {
    return this.entities[id];
  }
}

export default EntityManager;
