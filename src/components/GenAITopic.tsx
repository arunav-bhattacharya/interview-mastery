import React from 'react';
import Problem, { ProblemProps } from './Problem';
import { genaiStore } from './genaiStore';

export type GenAITopicProps = Omit<ProblemProps, 'store'>;

export default function GenAITopic(props: GenAITopicProps): React.ReactElement {
  return <Problem {...props} store={genaiStore} />;
}
