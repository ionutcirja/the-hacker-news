import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Container, { ArticlesListHOC, StateProps, DispatchProps } from '..';
import ArticlesCounter from '../../../components/articles-counter';
import ArticlesList from '../../../components/articles-list';

jest.mock('../style', () => ({
  Button: jest.fn().mockImplementation(({ children, ...rest }) => (
    <button type="button" {...rest}>{children}</button>
  )),
}));

jest.mock('@style/components', () => ({
  Row: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Section: jest.fn().mockImplementation(({ children }) => <section>{children}</section>),
  Loader: jest.fn().mockImplementation(({ children }) => <span>{children}</span>),
  Error: jest.fn().mockImplementation(({ children }) => <p>{children}</p>),
}));

jest.mock('../../../components/articles-list', () => (
  jest.fn(({ children }) => <ul>{children}</ul>)
));

jest.mock('../../../components/articles-counter', () => (
  jest.fn(({ children }) => <p>{children}</p>)
));

describe('ArticlesList container', () => {
  const history = createMemoryHistory();
  const createMockStore = configureMockStore();
  const state = {
    articles: {
      loading: false,
      error: false,
      list: [123, 432, 564, 654],
      content: {
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
      },
    },
  };
  const store = createMockStore(state);
  let props: StateProps & DispatchProps;

  beforeEach(() => {
    props = {
      articlesNum: 0,
      loadedArticlesNum: 0,
      loading: false,
      error: false,
      actions: {
        fetchArticlesListRequest: jest.fn(),
        fetchArticlesContentRequest: jest.fn(),
      },
    };
  });

  describe('render', () => {
    it('should render a loading message if the loading prop value is truthy', () => {
      props.loading = true;
      const { getByText } = render(<ArticlesListHOC {...props} />);
      expect(getByText(/loading/i)).toBeDefined();
    });

    it('should render an error message if the error prop value is truthy', () => {
      props.error = true;
      const { getByText } = render(<ArticlesListHOC {...props} />);
      expect(getByText(/something happened/i)).toBeDefined();
    });

    it('should render an ArticlesCounter component if articlesList prop value length is bigger than zero', () => {
      props.articlesNum = 2;
      const output = shallow(<ArticlesListHOC {...props} />);
      const counter = output.find(ArticlesCounter);
      expect(counter.length).toEqual(1);
      expect(counter.props()).toMatchObject({
        num: props.articlesNum,
      });
    });

    it('should render an ArticlesList component if articlesContent prop value is defined', () => {
      props.articlesContent = {
        123: {
          id: 123,
          title: 'title',
          by: 'John',
          time: 432432,
          url: 'http://domain.com',
          score: 1,
        },
      };
      const output = shallow(<ArticlesListHOC {...props} />);
      const list = output.find(ArticlesList);
      expect(list.length).toEqual(1);
      expect(list.props()).toMatchObject({
        list: props.articlesContent,
      });
    });
  });

  describe('mount', () => {
    it('should call call fetchArticlesListRequest action if articlesNum prop value is zero', () => {
      render(<ArticlesListHOC {...props} />);
      expect(props.actions.fetchArticlesListRequest).toHaveBeenCalled();
    });

    it('should call call fetchArticlesContentRequest action if articles number is bigger than zero'
      + ' and loadedArticlesNum value is zero', () => {
      props.articlesNum = 4;
      props.loadedArticlesNum = 0;
      props.articlesList = [123, 456, 678, 789];
      render(<ArticlesListHOC {...props} />);
      expect(props.actions.fetchArticlesContentRequest).toHaveBeenCalledWith({
        list: [123, 456, 678, 789],
      });
    });
  });

  describe('events handlers', () => {
    it('should load the next group of articles on load more button click', () => {
      props.articlesNum = 14;
      props.loadedArticlesNum = 10;
      props.articlesList = [123, 456, 678, 789, 653, 655, 756, 757, 324, 654, 325, 324, 987];
      props.articlesContent = {
        123: {
          id: 123,
          title: 'title',
          by: 'John',
          time: 432432,
          url: 'http://domain.com',
          score: 1,
        },
      };
      const { getByText } = render(
        <Router history={history}>
          <ArticlesListHOC {...props} />
        </Router>,
      );
      fireEvent.click(getByText(/load more/i));
      expect(props.actions.fetchArticlesContentRequest).toHaveBeenCalledWith({
        list: [325, 324, 987],
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should pass state article props', () => {
      const output = mount(
        <Provider store={store}>
          <Router history={history}>
            <Container />
          </Router>
        </Provider>,
      );
      expect(output.find(ArticlesListHOC).props()).toMatchObject({
        loading: state.articles.loading,
        error: state.articles.error,
        articlesNum: 4,
        articlesList: state.articles.list,
        articlesContent: state.articles.content,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should bind the necessary actions to props', () => {
      const output = mount(
        <Provider store={store}>
          <Router history={history}>
            <Container />
          </Router>
        </Provider>,
      );
      expect(output.find(ArticlesListHOC).props().actions.fetchArticlesListRequest).toBeDefined();
    });
  });
});
