// GenAI Topic Checklist store — separate localStorage namespace from the DSA
// tracker so progress is tracked independently.

import { createChecklistStore } from './checklistStore';

export const genaiStore = createChecklistStore('im-genai-checklist-v1');
