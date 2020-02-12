import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import ArticlesList from '..';

describe('ArticlesList component', () => {
  const props = {
    list: {
      123: {
        id: 123,
        title: 'Some title',
        by: 'John',
        score: 1,
        url: 'http://domain.com',
        time: 65645,
      },
      456: {
        id: 456,
        title: 'Another title',
        by: 'Joe',
        score: 1,
        url: 'http://domain.com',
        time: 534543,
      },
    },
  };

  it('should render a list of links to the article pages', () => {
    const output = shallow(<ArticlesList {...props} />);
    const links = output.find('Link');
    expect(links.length).toEqual(2);
    const keys = Object.keys(props.list);
    keys.forEach((key, index) => {
      const link = links.at(index);
      expect(link.props()).toMatchObject({
        to: `/articles/${props.list[keys[keys.length - index - 1]].id}`,
      });
    });
  });

  it('should render the title and the author of every article', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ArticlesList {...props} />
      </Router>,
    );
    Object.keys(props.list).forEach((key) => {
      expect(getByText(props.list[key].title)).toBeDefined();
      expect(getByText(props.list[key].by)).toBeDefined();
    });
  });
});
