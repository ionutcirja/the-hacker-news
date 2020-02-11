import React, { FC } from 'react';

type Props = {
  num: number;
}

const ArticlesCounter: FC<Props> = ({ num }: Props) => (
  <p>{`We found ${num} new ${num === 1 ? 'article' : 'articles'}.`}</p>
);

export default ArticlesCounter;
