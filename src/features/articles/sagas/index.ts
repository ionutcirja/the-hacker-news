import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_ARTICLES_LIST_REQUEST,
  fetchArticlesListSuccess,
  fetchArticlesListError,
} from '../actions';
import { fetchArticlesList } from '../services';

export function* fetchArticlesListRequest(): SagaIterator {
  try {
    const { data } = yield call(fetchArticlesList);
    yield put(fetchArticlesListSuccess({ list: data }));
  } catch (error) {
    yield put(fetchArticlesListError({ error: true }));
  }
}

export function* watchArticlesRequests(): SagaIterator {
  yield takeLatest(FETCH_ARTICLES_LIST_REQUEST, fetchArticlesListRequest);
}
