import React from 'react';
import { render } from '@testing-library/react';
import ArticlesCounter from '..';

describe('ArticlesCounter component', () => {
  it('should render the number of articles ', () => {
    let output = render(<ArticlesCounter num={1} />);
    expect(output.getByText(/1/)).toBeDefined();

    output = render(<ArticlesCounter num={4} />);
    expect(output.getByText(/4/)).toBeDefined();
  });
});
