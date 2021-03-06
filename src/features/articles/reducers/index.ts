/* eslint-disable no-param-reassign */
import { AnyAction } from 'redux';
import { handleActions } from 'redux-actions';
import produce, { Draft } from 'immer';
import {
  fetchArticlesListRequest,
  fetchArticlesListSuccess,
  fetchArticlesListError,
  fetchArticlesContentRequest,
  fetchArticlesContentSuccess,
} from '../actions';

export default handleActions({
  [fetchArticlesListRequest]: produce((state: Draft<Articles>) => {
    state.loading = true;
  }),
  [fetchArticlesListSuccess]: produce((state: Draft<Articles>, action: AnyAction) => {
    state.loading = false;
    state.list = action.payload.list;
  }),
  [fetchArticlesListError]: produce((state: Draft<Articles>) => {
    state.loading = false;
    state.error = true;
  }),
  [fetchArticlesContentRequest]: produce((state: Draft<Articles>) => {
    state.loading = true;
  }),
  [fetchArticlesContentSuccess]: produce((state: Draft<Articles>, action: AnyAction) => {
    state.loading = false;
    state.content = { ...(state.content || {}), ...action.payload.content };
  }),
}, {});
