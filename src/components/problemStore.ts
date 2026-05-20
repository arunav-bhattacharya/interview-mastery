// DSA Problem Checklist store — thin instance of the generic checklistStore
// factory. Keeps the existing named exports so <Problem> / <ChecklistSummary>
// keep working without changes elsewhere.

import { createChecklistStore } from './checklistStore';

export const problemStore = createChecklistStore('im-problem-checklist-v1');

export const isChecked = problemStore.isChecked;
export const setChecked = problemStore.setChecked;
export const toggleChecked = problemStore.toggleChecked;
export const resetAll = problemStore.resetAll;
export const getCheckedSet = problemStore.getCheckedSet;
export const subscribe = problemStore.subscribe;
