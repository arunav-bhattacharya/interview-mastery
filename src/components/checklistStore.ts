// Generic localStorage-backed checklist store factory.
// One store per localStorage key — used by the DSA Problem Checklist and the
// GenAI Topic Checklist as independent namespaces.

type Listener = () => void;

export interface ChecklistStore {
  readonly storageKey: string;
  isChecked(id: string): boolean;
  setChecked(id: string, checked: boolean): void;
  toggleChecked(id: string): boolean;
  resetAll(): void;
  getCheckedSet(): Set<string>;
  subscribe(listener: Listener): () => void;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function createChecklistStore(storageKey: string): ChecklistStore {
  const listeners = new Set<Listener>();

  function load(): Record<string, boolean> {
    if (!isBrowser()) return {};
    try {
      const raw = localStorage.getItem(storageKey);
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
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* quota / disabled — silently ignore */
    }
  }

  function isChecked(id: string): boolean {
    return !!load()[id];
  }

  function setChecked(id: string, checked: boolean): void {
    const state = load();
    if (checked) state[id] = true;
    else delete state[id];
    save(state);
    listeners.forEach((l) => l());
  }

  function toggleChecked(id: string): boolean {
    const next = !isChecked(id);
    setChecked(id, next);
    return next;
  }

  function resetAll(): void {
    save({});
    listeners.forEach((l) => l());
  }

  function getCheckedSet(): Set<string> {
    return new Set(Object.keys(load()));
  }

  function subscribe(listener: Listener): () => void {
    listeners.add(listener);
    if (isBrowser()) {
      const onStorage = (e: StorageEvent) => {
        if (e.key === storageKey) listener();
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

  return {
    storageKey,
    isChecked,
    setChecked,
    toggleChecked,
    resetAll,
    getCheckedSet,
    subscribe,
  };
}
