let state = {};
const listeners = new Set();

export function get(key) {
  return key ? state[key] : state;
}

export function set(key, val) {
  state[key] = val;
  listeners.forEach((fn) => fn(key, val, state));
}

export function onChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
