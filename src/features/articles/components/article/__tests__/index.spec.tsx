import React from 'react';
import { render } from '@testing-library/react';
import Article from '..';

describe('Article component', () => {
  const props = {
    id: 1234,
    title: 'Some title',
    by: 'John',
    score: 9,
    url: 'http://domain.com',
    time: 1581521127735,
  };

  it('should render the title', () => {
    const { getByText } = render(<Article {...props} />);
    expect(getByText(props.title)).toBeDefined();
  });

  it('should render the author', () => {
    const { getByText } = render(<Article {...props} />);
    expect(getByText(props.by, { exact: false })).toBeDefined();
  });

  it('should render the score', () => {
    const { getByText } = render(<Article {...props} />);
    expect(getByText(props.score.toString(), { exact: false })).toBeDefined();
  });

  it('should render the publication date', () => {
    const { getByText } = render(<Article {...props} />);
    expect(getByText('February 12th 2020', { exact: false })).toBeDefined();
  });

  it('should render the full url', () => {
    const { getByRole } = render(<Article {...props} />);
    expect(getByRole('link')).toHaveAttribute('href', props.url);
  });
});
