import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import App from './app';

render(
  <App routes={routes} />,
  document.getElementById('root'),
);
