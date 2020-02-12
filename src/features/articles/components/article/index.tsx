import React from 'react';
import { format } from 'date-fns';

const Article: React.FC<ArticleContent> = ({
  title,
  by,
  score,
  time,
  url,
}: ArticleContent) => (
  <>
    <h1>{title}</h1>
    <h2>{`Author: ${by}`}</h2>
    <p>{`Rating: ${score}`}</p>
    <p>{`Publication date: ${format(time, 'LLLL do yyyy')}`}</p>
    <a href={url} rel="noopener noreferrer" target="_blank">See full article</a>
  </>
);

export default Article;
