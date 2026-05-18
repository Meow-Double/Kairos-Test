const subscriptions = new Map<string, Set<Function>>();

let currentEffect: Function | null = null;

export function reactive<T extends Record<keyof T, unknown>>(state: T): T {
  return new Proxy(state, {
    get(target, key) {
      if (typeof key !== 'string') return;
      const property = key;

      if (currentEffect) {
        if (!subscriptions.has(property)) {
          subscriptions.set(property, new Set());
        }
        subscriptions.get(property)!.add(currentEffect);
      }

      return target[key];
    },

    set(target, key, value) {
      if (typeof key !== 'string') return;
      const property = key;

      const oldValue = target[key];

      if (oldValue === value) return true;

      target[key] = value;

      const subs = subscriptions.get(property);
      if (subs) {
        subs.forEach((effect) => effect());
      }

      return true;
    },
  });
}

export function effect(fn: Function) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}
