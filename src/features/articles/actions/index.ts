import { createAction } from 'redux-actions';

export const FETCH_ARTICLES_LIST_REQUEST = 'FETCH_ARTICLES_LIST_REQUEST';
export const FETCH_ARTICLES_LIST_SUCCESS = 'FETCH_ARTICLES_LIST_SUCCESS';
export const FETCH_ARTICLES_LIST_ERROR = 'FETCH_ARTICLES_LIST_ERROR';

export const fetchArticlesListRequest: any = createAction(FETCH_ARTICLES_LIST_REQUEST);
export const fetchArticlesListSuccess: any = createAction(FETCH_ARTICLES_LIST_SUCCESS);
export const fetchArticlesListError: any = createAction(FETCH_ARTICLES_LIST_ERROR);
