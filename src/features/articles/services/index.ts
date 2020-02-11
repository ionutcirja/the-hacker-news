import axios from 'axios';

const FETCH_ARTICLES_LIST_URL = '/v0/newstories.json';

export const fetchArticlesList = (): Promise<any> => (
  axios.get(FETCH_ARTICLES_LIST_URL)
);
