import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DASHBOARD_PATH } from '@routes';
import { Section, Row, Loader } from '@style/components';
import { fetchArticlesContentRequest } from '../../actions';
import { articleSelector } from '../../selectors';
import Article from '../../components/article';
import { BackLink } from './style';

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
    <Section>
      <Row>
        <BackLink to={DASHBOARD_PATH}>
          Back to articles list
        </BackLink>
      </Row>
      {loading && (
        <Row>
          <Loader>Loading...</Loader>
        </Row>
      )}
      {article && (
        <Row>
          <Article {...article} />
        </Row>
      )}
    </Section>
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
