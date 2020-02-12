import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Container, {
  ArticleHOC,
  StateProps,
  OwnProps,
  DispatchProps,
} from '..';
import { BackLink } from '../style';
import Article from '../../../components/article';

jest.mock('@style/components', () => ({
  Row: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Section: jest.fn().mockImplementation(({ children }) => <section>{children}</section>),
  Loader: jest.fn().mockImplementation(({ children }) => <span>{children}</span>),
  Error: jest.fn().mockImplementation(({ children }) => <p>{children}</p>),
}));

jest.mock('../style', () => ({
  BackLink: jest.fn().mockImplementation(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

jest.mock('../../../components/article', () => (
  jest.fn(({ children }) => <div>{children}</div>)
));

describe('Article container', () => {
  const history = createMemoryHistory();
  const createMockStore = configureMockStore();
  const state = {
    articles: {
      loading: false,
      error: false,
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
  let props: StateProps & OwnProps & DispatchProps;

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: 123,
        },
      },
      article: {
        title: 'some title',
        id: 123,
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 1234556,
      },
      loading: false,
      actions: {
        fetchArticlesContentRequest: jest.fn(),
      },
    };
  });

  describe('render', () => {
    it('should render a link to the dashboard', () => {
      const output = shallow(<ArticleHOC {...props} />);
      const link = output.find(BackLink);
      expect(link.length).toEqual(1);
    });

    it('should render a loading message if the loading prop value is truthy', () => {
      props.loading = true;
      const { getByText } = render(
        <Router history={history}>
          <ArticleHOC {...props} />
        </Router>,
      );
      expect(getByText(/loading/i)).toBeDefined();
    });

    it('should render an Article component if article prop value is defined', () => {
      const output = shallow(<ArticleHOC {...props} />);
      const article = output.find(Article);
      expect(article.length).toEqual(1);
      expect(article.props()).toMatchObject({
        ...props.article,
      });
    });
  });

  describe('mount', () => {
    it('should call call fetchArticlesContentRequest action if article prop value is falsy', () => {
      props.article = null;
      render(
        <Router history={history}>
          <ArticleHOC {...props} />
        </Router>,
      );
      expect(props.actions.fetchArticlesContentRequest).toHaveBeenCalledWith({
        list: [123],
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should pass state article props', () => {
      const output = mount(
        <Provider store={store}>
          <Router history={history}>
            <Container match={{ params: { id: 123 } }} />
          </Router>
        </Provider>,
      );
      expect(output.find(ArticleHOC).props()).toMatchObject({
        loading: state.articles.loading,
        article: state.articles.content[123],
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should bind the necessary actions to props', () => {
      const output = mount(
        <Provider store={store}>
          <Router history={history}>
            <Container match={{ params: { id: 123 } }} />
          </Router>
        </Provider>,
      );
      expect(output.find(ArticleHOC).props().actions.fetchArticlesContentRequest).toBeDefined();
    });
  });
});
