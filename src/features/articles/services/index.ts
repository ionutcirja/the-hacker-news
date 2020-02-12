import axios from 'axios';

const FETCH_ARTICLES_LIST_URL = '/v0/newstories.json';
const FETCH_ARTICLE_CONTENT_URL = '/v0/item';

export const fetchArticlesList = (): Promise<any> => (
  axios.get(FETCH_ARTICLES_LIST_URL)
);

export const fetchArticleContent = (id: number): Promise<any> => (
  axios.get(`${FETCH_ARTICLE_CONTENT_URL}/${id}.json`)
);
