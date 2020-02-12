import React from 'react';
import { format } from 'date-fns';
import {
  Title,
  Author,
  Rating,
  Date,
  Link,
} from './style';

const Article: React.FC<ArticleContent> = ({
  title,
  by,
  score,
  time,
  url,
}: ArticleContent) => (
  <>
    <Title>{title}</Title>
    <Author>{`Author: ${by}`}</Author>
    <Rating>{`Rating: ${score}`}</Rating>
    <Date>{`Publication date: ${format(time, 'LLLL do yyyy')}`}</Date>
    <Link href={url} rel="noopener noreferrer" target="_blank">
      See full article
    </Link>
  </>
);

export default Article;
