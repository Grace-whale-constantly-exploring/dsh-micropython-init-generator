import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../client.js', import.meta.url), 'utf8');
let definition;
globalThis.window = { __ModuleLoader__: { load(value) { definition = value; } } };
vm.runInThisContext(source, { filename: 'client.js' });
const mod = definition.factory(() => ({ createElement() {}, useState() {}, useEffect() {}, useRef() {} }));
let registered = false;
let injectedSlot = null;
const ctx = {
  effect(callback) {
    return callback();
  },
  locale: {
    register(namespace, locale, dict) {
      if (!dict || typeof dict !== 'object') throw new Error('bad dict');
      return () => {};
    },
    bind() {
      return (key) => key;
    },
  },
  slots: {
    inject(slot, callback) {
      injectedSlot = slot;
      return callback();
    },
    register(options, component) {
      registered = options.id === 'micropython-init-generator' && typeof component === 'function';
      return () => {};
    },
  },
};
mod.apply(ctx);
console.log('apply ok', { injectedSlot, registered });
