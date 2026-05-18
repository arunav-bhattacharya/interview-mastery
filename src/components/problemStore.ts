// Shared localStorage-backed store for per-problem checked state.
// Used by <Problem> (writes) and <ChecklistSummary> (reads).

type Listener = () => void;

const STORAGE_KEY = 'im-problem-checklist-v1';
const listeners = new Set<Listener>();

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function load(): Record<string, boolean> {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function save(state: Record<string, boolean>): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / disabled — silently ignore */
  }
}

export function isChecked(id: string): boolean {
  return !!load()[id];
}

export function setChecked(id: string, checked: boolean): void {
  const state = load();
  if (checked) state[id] = true;
  else delete state[id];
  save(state);
  listeners.forEach((l) => l());
}

export function toggleChecked(id: string): boolean {
  const next = !isChecked(id);
  setChecked(id, next);
  return next;
}

export function resetAll(): void {
  save({});
  listeners.forEach((l) => l());
}

export function getCheckedSet(): Set<string> {
  return new Set(Object.keys(load()));
}

// React-friendly subscription. Also listens for cross-tab `storage` events so
// state stays in sync between tabs / iframes.
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  if (isBrowser()) {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }
  return () => {
    listeners.delete(listener);
  };
}
