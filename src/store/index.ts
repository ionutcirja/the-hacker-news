/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from '@reducers';

type EnhancedStore = Store & {
  runSaga: Function;
  close: Function;
}

export default (initialState: State, debug = true): EnhancedStore => {
  const composeEnhancers = (debug && (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store: EnhancedStore = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
