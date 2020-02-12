import React from 'react';
import { Text } from './style';

type Props = {
  num: number;
}

const ArticlesCounter: React.FC<Props> = ({ num }: Props) => (
  <Text>{`We found ${num} new ${num === 1 ? 'article' : 'articles'}.`}</Text>
);

export default ArticlesCounter;
