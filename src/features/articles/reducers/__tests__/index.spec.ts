import reducer from '..';

describe('Articles reducers', () => {
  it('should return the default state if the action type is not defined', () => {
    const initialState = { list: [123, 545] };
    expect(reducer(initialState, { type: 'UNDEFINED_ACTION', payload: {} })).toEqual(initialState);
  });

  it('should return a new state containing a loading prop equal with true'
    + ' if the action type is FETCH_ARTICLES_LIST_REQUEST', () => {
    const initialState = {
      loading: false,
    };
    expect(reducer(initialState, { type: 'FETCH_ARTICLES_LIST_REQUEST', payload: {} })).toEqual({
      loading: true,
    });
  });

  it('should return a new state containing the payload list and a loading prop equal with false'
    + ' if the action type is FETCH_ARTICLES_LIST_SUCCESS', () => {
    const initialState = {
      loading: true,
    };
    const list = [1234, 434, 5435, 656];
    expect(reducer(initialState, { type: 'FETCH_ARTICLES_LIST_SUCCESS', payload: { list } })).toEqual({
      loading: false,
      list,
    });
  });

  it('should return a new state containing a loading prop equal with false and an error prop equal with true'
    + ' if the action type is FETCH_ARTICLES_LIST_ERROR', () => {
    const initialState = {
      loading: true,
    };
    expect(reducer(initialState, { type: 'FETCH_ARTICLES_LIST_ERROR', payload: {} })).toEqual({
      loading: false,
      error: true,
    });
  });

  it('should return a new state containing a loading prop equal with true'
    + ' if the action type is FETCH_ARTICLES_CONTENT_REQUEST', () => {
    const initialState = {
      loading: false,
    };
    expect(reducer(initialState, { type: 'FETCH_ARTICLES_CONTENT_REQUEST', payload: {} })).toEqual({
      loading: true,
    });
  });

  it('should return a new state containing the payload list and a loading prop equal with false'
    + ' if the action type is FETCH_ARTICLES_CONTENT_SUCCESS', () => {
    const initialState = {
      loading: true,
    };
    const initialContent = {
      123: {
        title: 'initial title',
        id: 123,
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 1234556,
      },
      678: {
        title: 'title',
        id: 678,
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 1234556,
      },
    };
    const content = {
      123: {
        title: 'some title',
        id: 123,
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 1234556,
      },
      456: {
        title: 'another title',
        id: 456,
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 1234556,
      },
    };
    expect(reducer(initialState, { type: 'FETCH_ARTICLES_CONTENT_SUCCESS', payload: { content } })).toEqual({
      loading: false,
      content: {
        ...content,
      },
    });
    expect(reducer(
      { ...initialState, content: initialContent },
      { type: 'FETCH_ARTICLES_CONTENT_SUCCESS', payload: { content } },
    )).toEqual({
      loading: false,
      content: {
        ...initialContent,
        ...content,
      },
    });
  });
});
