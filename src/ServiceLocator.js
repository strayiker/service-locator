module.exports = class ServiceLocator {
  constructor() {
    this.services = new Map();
    this.dependents = new Map();
  }

  register = ({
    name,
    constructor,
    instance = null,
    args = [],
    deps = [],
    singleton = true,
  }) => {
    const definition = {
      name,
      constructor,
      instance,
      args,
      deps,
      singleton,
    };

    deps.forEach(dep => {
      if (!this.dependents.has(dep)) {
        this.dependents.set(dep, []);
      }
      this.dependents.get(dep).push(name);
    });

    this.evict(name);
    this.services.set(name, definition);

    Object.defineProperty(this, name, {
      get() {
        return this.resolve(name);
      },
    });
  };

  resolve = name => {
    if (!this.services.has(name)) {
      throw new Error(`${name} not registered.`);
    }

    const definition = this.services.get(name);

    if (definition.instance) {
      return definition.instance;
    }

    const deps = definition.deps.map(this.resolve);
    const Constructor = definition.constructor;
    const instance = new Constructor(...definition.args, ...deps);

    if (definition.singleton) {
      definition.instance = instance;
    }

    return instance;
  };

  evict = name => {
    if (!this.dependents.has(name)) {
      return;
    }

    this.dependents.get(name).forEach(dep => {
      const definition = this.services.get(dep);
      definition.instance = null;
      this.evict(dep);
    });
  };
};
