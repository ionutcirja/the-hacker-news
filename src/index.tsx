import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import initAxios from '@config/axios';
import GlobalStyle from '@style';
import theme from '@style/theme';
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
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
