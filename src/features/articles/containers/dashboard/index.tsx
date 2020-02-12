import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchArticlesListRequest } from '../../actions';
import { articlesListLengthSelector } from '../../selectors';
import ArticlesCounter from '../../components/articles-counter';

export type StateProps = {
  articlesNum?: number;
  loading?: boolean;
  error?: boolean;
};

export type DispatchProps = {
  actions: {
    fetchArticlesListRequest: () => void;
  };
}

export const ArticlesListHOC: React.FC<StateProps & DispatchProps> = ({
  actions,
  loading,
  error,
  articlesNum,
}: StateProps & DispatchProps) => {
  React.useEffect(() => {
    actions.fetchArticlesListRequest();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something happened on our end. Please try again later.</p>}
      {articlesNum && <ArticlesCounter num={articlesNum} />}
    </>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  articlesNum: articlesListLengthSelector(state),
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
