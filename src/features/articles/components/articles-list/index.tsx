import React from 'react';
import { ARTICLE_PATH } from '@routes';
import { ArticleLink, List, ListItem } from './style';

type Props = {
  list: {
    [id: number]: ArticleContent;
  };
}

const ArticlesList: React.FC<Props> = ({ list }: Props) => (
  <List>
    {Object.keys(list)
      .sort((key1: string, key2: string) => parseInt(key2, 10) - parseInt(key1, 10))
      .map((key: string) => (
        <ListItem key={key}>
          <ArticleLink to={`${ARTICLE_PATH}${list[key].id}`}>
            {list[key].title}
          </ArticleLink>
        </ListItem>
      ))}
  </List>
);

export default ArticlesList;
