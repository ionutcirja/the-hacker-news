import { call, takeLatest, put } from 'redux-saga/effects';
import {
  fetchArticlesList,
} from '../../services';
import {
  watchArticlesRequests,
  fetchArticlesListRequest,
} from '..';

describe('Articles sagas', () => {
  describe('watchArticlesRequests', () => {
    it('should wait for a FETCH_ARTICLES_LIST_REQUEST action', () => {
      const generator = watchArticlesRequests();
      expect(generator.next().value).toEqual(
        takeLatest('FETCH_ARTICLES_LIST_REQUEST', fetchArticlesListRequest),
      );
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('fetchArticlesListRequest', () => {
    it('should call fetchArticlesList services method and'
      + ' dispatch a FETCH_ARTICLES_LIST_SUCCESS action in case of success', () => {
      const data = [123, 545, 656, 789];
      const generator = fetchArticlesListRequest();
      expect(generator.next().value).toEqual(call(fetchArticlesList));
      expect(generator.next({ data }).value).toEqual(
        put({
          type: 'FETCH_ARTICLES_LIST_SUCCESS',
          payload: { list: data },
        }),
      );
      expect(generator.next().done).toEqual(true);
    });

    it('should call fetchArticlesList services method and'
      + ' dispatch a FETCH_ARTICLES_LIST_ERROR action in case of error', () => {
      const error = { message: 'error' };
      const generator = fetchArticlesListRequest();
      expect(generator.next().value).toEqual(call(fetchArticlesList));
      if (generator.throw) {
        expect(generator.throw(error).value).toEqual(
          put({
            type: 'FETCH_ARTICLES_LIST_ERROR',
            payload: {
              error: true,
            },
          }),
        );
      }
      expect(generator.next().done).toEqual(true);
    });
  });
});
