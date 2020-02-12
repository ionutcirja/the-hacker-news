import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { getByText, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import Container, { ArticlesListHOC, StateProps, DispatchProps } from '..';

describe('ArticlesList container', () => {
  const createMockStore = configureMockStore();
  const state = {
    articles: {
      loading: false,
      error: false,
      list: [123, 432, 564, 654],
    },
  };
  const store = createMockStore(state);
  let props: StateProps & DispatchProps;

  beforeEach(() => {
    props = {
      loading: false,
      error: false,
      actions: {
        fetchArticlesListRequest: jest.fn(),
      },
    };
  });

  describe('render', () => {
    it('should render a loading message if the loading prop value is truthy', () => {
      props.loading = true;
      const { container } = render(<ArticlesListHOC {...props} />);
      expect(getByText(container, /loading/i)).toBeDefined();
    });

    it('should render an error message if the error prop value is truthy', () => {
      props.error = true;
      const { container } = render(<ArticlesListHOC {...props} />);
      expect(getByText(container, /something happened/i)).toBeDefined();
    });

    it('should render an ArticlesCounter if articlesList prop value length is bigger than zero', () => {
      props.articlesNum = 2;
      const output = shallow(<ArticlesListHOC {...props} />);
      const counter = output.find('ArticlesCounter');
      expect(counter.length).toEqual(1);
      expect(counter.props()).toMatchObject({
        num: props.articlesNum,
      });
    });
  });

  describe('mount', () => {
    it('should call call fetchArticlesListRequest action', () => {
      render(<ArticlesListHOC {...props} />);
      expect(props.actions.fetchArticlesListRequest).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should pass state article props', () => {
      const output = mount(
        <Provider store={store}>
          <Container />
        </Provider>,
      );
      expect(output.find(ArticlesListHOC).props()).toMatchObject({
        loading: state.articles.loading,
        error: state.articles.error,
        articlesNum: 4,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('should bind the necessary actions to props', () => {
      const output = mount(
        <Provider store={store}>
          <Container />
        </Provider>,
      );
      expect(output.find(ArticlesListHOC).props().actions.fetchArticlesListRequest).toBeDefined();
    });
  });
});
