import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import initAxios from '@config/axios';
import GlobalStyle from '@style';
import routes from '@routes';
import createStore from '@store';
import rootSaga from '@sagas';
import App from '@app';

initAxios({ baseUrl: 'https://hacker-news.firebaseio.com' });

const initialState = {
  articles: {},
};
const store = createStore(initialState);
store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <App routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
