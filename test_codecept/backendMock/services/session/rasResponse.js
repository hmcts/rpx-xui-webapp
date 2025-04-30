class RasResponseStore {
  constructor() {
    if (!RasResponseStore.instance) {
      this.store = new Map();
      RasResponseStore.instance = this;
    }
    return RasResponseStore.instance;
  }

  set(id, value) {
    this.store.set(id, value);
  }

  get(id) {
    return this.store.get(id);
  }

  has(id) {
    return this.store.has(id);
  }

  delete(id) {
    this.store.delete(id);
  }
}

const instance = new RasResponseStore();
Object.freeze(instance);

module.exports = instance;
