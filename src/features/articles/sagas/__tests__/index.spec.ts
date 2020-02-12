import {
  call,
  takeLatest,
  put,
  all,
} from 'redux-saga/effects';
import {
  fetchArticleContent,
  fetchArticlesList,
} from '../../services';
import {
  watchArticlesRequests,
  fetchArticlesListRequest,
  fetchArticlesContentRequest,
} from '..';

describe('Articles sagas', () => {
  describe('watchArticlesRequests', () => {
    it('should wait for a list of requests actions', () => {
      const generator = watchArticlesRequests();
      expect(generator.next().value).toEqual(
        takeLatest('FETCH_ARTICLES_LIST_REQUEST', fetchArticlesListRequest),
      );
      expect(generator.next().value).toEqual(
        takeLatest('FETCH_ARTICLES_CONTENT_REQUEST', fetchArticlesContentRequest),
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

  describe('fetchArticlesContentRequest', () => {
    it('should call fetchArticleContent services method for every article id and'
      + ' dispatch a FETCH_ARTICLES_CONTENT_SUCCESS action in case of success', () => {
      const data = [
        {
          data: {
            id: 123,
            title: 'some title',
          },
        },
        {
          data: {
            id: 567,
            title: 'another title',
          },
        },
      ];
      const generator = fetchArticlesContentRequest({
        type: 'ACTION',
        payload: { list: [123, 567] },
      });
      expect(generator.next().value).toEqual(all([
        call(fetchArticleContent, 123),
        call(fetchArticleContent, 567),
      ]));
      expect(generator.next(data).value).toEqual(
        put({
          type: 'FETCH_ARTICLES_CONTENT_SUCCESS',
          payload: {
            content: {
              123: {
                ...data[0].data,
              },
              567: {
                ...data[1].data,
              },
            },
          },
        }),
      );
      expect(generator.next().done).toEqual(true);
    });
  });
});
