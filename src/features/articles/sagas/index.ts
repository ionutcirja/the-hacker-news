import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';
import {
  FETCH_ARTICLES_LIST_REQUEST,
  FETCH_ARTICLES_CONTENT_REQUEST,
  fetchArticlesListSuccess,
  fetchArticlesListError,
  fetchArticlesContentSuccess,
  fetchArticlesContentError,
} from '../actions';
import { fetchArticlesList, fetchArticleContent } from '../services';

export function* fetchArticlesListRequest(): SagaIterator {
  try {
    const { data } = yield call(fetchArticlesList);
    yield put(fetchArticlesListSuccess({ list: data }));
  } catch (error) {
    yield put(fetchArticlesListError({ error: true }));
  }
}

export function* fetchArticlesContentRequest(action: AnyAction): SagaIterator {
  const { list } = action.payload;
  try {
    const requests = list.map((id: number) => call(fetchArticleContent, id));
    const result = yield all(requests);
    // TODO check api (sometimes even when the id is valid return data is null)
    yield put(fetchArticlesContentSuccess({
      content: result.reduce((acc, curr) => ({
        ...acc,
        ...(curr.data ? { [curr.data.id]: curr.data } : {}),
      }), {}),
    }));
  } catch (error) {
    // TODO it seems the api always returns a 200 on this endpoint event when the id id not valid
    // yield put(fetchArticlesContentError({ error: true }));
  }
}

export function* watchArticlesRequests(): SagaIterator {
  yield takeLatest(FETCH_ARTICLES_LIST_REQUEST, fetchArticlesListRequest);
  yield takeLatest(FETCH_ARTICLES_CONTENT_REQUEST, fetchArticlesContentRequest);
}
