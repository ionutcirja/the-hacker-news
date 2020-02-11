import React from 'react';
import { getByText, render } from '@testing-library/react';
import ArticlesCounter from '..';

describe('ArticlesCounter component', () => {
  it('should render the number of articles ', () => {
    let output = render(<ArticlesCounter num={1} />);
    expect(getByText(output.container, /1/)).toBeDefined();

    output = render(<ArticlesCounter num={4} />);
    expect(getByText(output.container, /4/)).toBeDefined();
  });
});
