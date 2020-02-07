import React from 'react';
import { shallow } from 'enzyme';

import App from '..';

describe('App', () => {
  describe('render', () => {
    it('should render', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toBeDefined();
    });
  });
});
