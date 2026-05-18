const subscriptions = new Map<string, Set<() => void>>();
let currentEffect: (() => void) | null = null;

export const reactive = <T extends Record<string, any>>(state: T): T => {
  return new Proxy(state, {
    get(target, key: string | symbol) {
      if (typeof key === 'string' && currentEffect) {
        let deps = subscriptions.get(key);
        if (!deps) {
          deps = new Set();
          subscriptions.set(key, deps);
        }
        deps.add(currentEffect);
      }

      return Reflect.get(target, key);
    },

    set(target, key: string | symbol, value: unknown) {
      const oldValue = Reflect.get(target, key);

      if (Object.is(oldValue, value)) return true;

      const success = Reflect.set(target, key, value);

      if (success && typeof key === 'string') {
        const deps = subscriptions.get(key);
        if (deps) {
          deps.forEach((fn) => fn());
        }
      }

      return success;
    },
  });
};

export const effect = (fn: () => void) => {
  currentEffect = fn;
  try {
    fn();
  } finally {
    currentEffect = null;
  }
};
