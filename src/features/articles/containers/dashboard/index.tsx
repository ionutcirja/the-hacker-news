import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Maybe } from 'monet';
import { fetchArticlesListRequest, fetchArticlesContentRequest } from '../../actions';
import { articlesListSelector, articlesListLengthSelector, articlesContentSelector } from '../../selectors';
import ArticlesCounter from '../../components/articles-counter';
import ArticlesList from '../../components/articles-list';

export type StateProps = {
  articlesList?: number[];
  articlesNum?: number;
  articlesContent?: {
    [id: number]: ArticleContent;
  };
  loading?: boolean;
  error?: boolean;
};

type FetchArticlesContentParams = {
  list: number[];
};

export type DispatchProps = {
  actions: {
    fetchArticlesListRequest: () => void;
    fetchArticlesContentRequest: ({ list }: FetchArticlesContentParams) => void;
  };
}

const GROUP_ARTICLES_NUM = 3;

export const ArticlesListHOC: React.FC<StateProps & DispatchProps> = ({
  actions,
  loading,
  error,
  articlesNum,
  articlesList,
  articlesContent,
}: StateProps & DispatchProps) => {
  const [loadedArticlesNum, setLoadedArticlesNum] = React.useState<number>(0);

  React.useEffect(() => {
    if (!articlesNum) {
      actions.fetchArticlesListRequest();
    }
  }, []);

  React.useEffect(() => {
    if (articlesNum > 0) {
      actions.fetchArticlesContentRequest({
        list: articlesList.slice(loadedArticlesNum, loadedArticlesNum + GROUP_ARTICLES_NUM),
      });
    }
  }, [articlesNum, loadedArticlesNum]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something happened on our end. Please try again later.</p>}
      {Maybe.fromNull(articlesNum)
        .map((value: number) => <ArticlesCounter num={articlesNum} />)
        .orSome(null)}
      {articlesContent && <ArticlesList list={articlesContent} />}
    </>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  articlesList: articlesListSelector(state),
  articlesNum: articlesListLengthSelector(state),
  articlesContent: articlesContentSelector(state),
  loading: state.articles.loading,
  error: state.articles.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    ...bindActionCreators({
      fetchArticlesListRequest,
      fetchArticlesContentRequest,
    }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesListHOC);
