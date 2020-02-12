export const articlesListSelector = (state: State) => state.articles.list;

export const articlesListLengthSelector = (state: State) => state.articles.list?.length;

export const articlesContentSelector = (state: State) => state.articles.content;

export const articleSelector = (id: number) => (state: State) => (
  (articlesContentSelector(state) || {})[id]
);
