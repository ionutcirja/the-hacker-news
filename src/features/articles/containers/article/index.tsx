import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DASHBOARD_PATH } from '@routes';
import { fetchArticlesContentRequest } from '../../actions';
import { articleSelector } from '../../selectors';
import Article from '../../components/article';

export type StateProps = {
  article?: ArticleContent;
  loading?: boolean;
};

export type OwnProps = {
  match: {
    params: {
      id: number;
    };
  };
};

type FetchArticlesContentParams = {
  list: number[];
};

export type DispatchProps = {
  actions: {
    fetchArticlesContentRequest: ({ list }: FetchArticlesContentParams) => void;
  };
}

export const ArticleHOC: React.FC<StateProps & OwnProps & DispatchProps> = ({
  article,
  actions,
  loading,
  match,
}: StateProps & OwnProps & DispatchProps) => {
  React.useEffect(() => {
    if (!article) {
      actions.fetchArticlesContentRequest({
        list: [match.params.id],
      });
    }
  }, [match.params.id]);

  return (
    <>
      <Link to={DASHBOARD_PATH}>Back to articles list</Link>
      {loading && <p>Loading...</p>}
      {article && <Article {...article} />}
    </>
  );
};

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({
  article: articleSelector(props.match.params.id)(state),
  loading: state.articles.loading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    ...bindActionCreators({
      fetchArticlesContentRequest,
    }, dispatch),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleHOC);
