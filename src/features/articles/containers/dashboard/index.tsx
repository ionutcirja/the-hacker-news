import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchArticlesListRequest } from '../../actions';
import ArticlesCounter from '../../components/articles-counter';

export type StateProps = {
  articlesList?: number[];
  loading?: boolean;
  error?: boolean;
};

export type DispatchProps = {
  actions: {
    fetchArticlesListRequest: () => void;
  };
}

export const ArticlesListHOC: FC<StateProps & DispatchProps> = ({
  actions,
  loading,
  error,
  articlesList,
}: StateProps & DispatchProps) => {
  useEffect(() => {
    actions.fetchArticlesListRequest();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something happened on our end. Please try again later.</p>}
      {articlesList && <ArticlesCounter num={articlesList.length} />}
    </>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  articlesList: state.articles.list,
  loading: state.articles.loading,
  error: state.articles.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    ...bindActionCreators({
      fetchArticlesListRequest,
    }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesListHOC);
