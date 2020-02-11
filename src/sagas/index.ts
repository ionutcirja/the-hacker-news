import { fork, all } from 'redux-saga/effects';
import { watchArticlesRequests } from '@features/articles/sagas';

export default function* () {
  yield all([
    fork(watchArticlesRequests),
  ]);
}
