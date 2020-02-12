import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLE_PATH } from '@routes';

type Props = {
  list: {
    [id: number]: ArticleContent;
  };
}

const ArticlesList: React.FC<Props> = ({ list }: Props) => (
  <ul>
    {Object.keys(list)
      .sort((key1: string, key2: string) => parseInt(key2, 10) - parseInt(key1, 10))
      .map((key: string) => (
        <li key={key}>
          <Link to={`${ARTICLE_PATH}${list[key].id}`}>
            <span>{list[key].title}</span>
            <span>{list[key].by}</span>
          </Link>
        </li>
      ))}
  </ul>
);

export default ArticlesList;
