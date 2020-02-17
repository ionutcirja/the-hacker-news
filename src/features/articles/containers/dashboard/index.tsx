import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Section,
  Row,
  Loader,
  Error,
} from '@style/components';
import { fetchArticlesListRequest, fetchArticlesContentRequest } from '../../actions';
import {
  articlesListSelector,
  articlesListLengthSelector,
  articlesContentSelector,
  loadedArticlesListLengthSelector,
} from '../../selectors';
import ArticlesCounter from '../../components/articles-counter';
import ArticlesList from '../../components/articles-list';
import { Button } from './style';

export type StateProps = {
  articlesList?: number[];
  articlesNum: number;
  loadedArticlesNum: number;
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

const GROUP_ARTICLES_NUM = 10;

export const ArticlesListHOC: React.FC<StateProps & DispatchProps> = ({
  actions,
  loading,
  error,
  articlesNum,
  loadedArticlesNum,
  articlesList,
  articlesContent,
}: StateProps & DispatchProps) => {
  React.useEffect(() => {
    if (!articlesNum) {
      actions.fetchArticlesListRequest();
    }
  }, []);

  React.useEffect(() => {
    if (articlesNum > 0 && loadedArticlesNum === 0) {
      actions.fetchArticlesContentRequest({
        list: articlesList.slice(0, GROUP_ARTICLES_NUM),
      });
    }
  }, [articlesNum]);

  const onLoadClickHandler = () => {
    actions.fetchArticlesContentRequest({
      list: articlesList.slice(loadedArticlesNum, loadedArticlesNum + GROUP_ARTICLES_NUM),
    });
  };

  return (
    <Section>
      {error && (
        <Row>
          <Error>Something happened on our end. Please try again later.</Error>
        </Row>
      )}
      {articlesNum > 0 && (
        <Row>
          <ArticlesCounter num={articlesNum} />
        </Row>
      )}
      {loading && (articlesNum === 0 || loadedArticlesNum === 0) && (
        <Row>
          <Loader>Loading...</Loader>
        </Row>
      )}
      {articlesContent && (
        <Row>
          <ArticlesList list={articlesContent} />
        </Row>
      )}
      {articlesContent && loadedArticlesNum < articlesNum && (
        <Row>
          <Button
            type="button"
            disabled={loading}
            onClick={onLoadClickHandler}
          >
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </Row>
      )}
    </Section>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  articlesList: articlesListSelector(state),
  articlesNum: articlesListLengthSelector(state),
  loadedArticlesNum: loadedArticlesListLengthSelector(state),
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
