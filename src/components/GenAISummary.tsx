import React from 'react';
import ChecklistSummary, { PatternTarget } from './ChecklistSummary';
import { genaiStore } from './genaiStore';

interface Props {
  patterns: PatternTarget[];
}

export default function GenAISummary({ patterns }: Props): React.ReactElement {
  return (
    <ChecklistSummary
      patterns={patterns}
      store={genaiStore}
      itemLabel="done"
      resetLabel="Reset all GenAI tracker progress?"
    />
  );
}
