import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Maybe } from 'monet';
import {
  Section,
  Row,
  Loader,
  Error,
} from '@style/components';
import { fetchArticlesListRequest, fetchArticlesContentRequest } from '../../actions';
import { articlesListSelector, articlesListLengthSelector, articlesContentSelector } from '../../selectors';
import ArticlesCounter from '../../components/articles-counter';
import ArticlesList from '../../components/articles-list';
import { Button } from './style';

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

const GROUP_ARTICLES_NUM = 10;

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

  const onLoadClickHandler = () => {
    setLoadedArticlesNum(loadedArticlesNum + GROUP_ARTICLES_NUM);
  };

  return (
    <Section>
      {error && (
        <Row>
          <Error>Something happened on our end. Please try again later.</Error>
        </Row>
      )}
      {Maybe.fromNull(articlesNum)
        .map((value: number) => (
          <Row>
            <ArticlesCounter num={articlesNum} />
          </Row>
        ))
        .orSome(null)}
      {articlesContent && (
        <Row>
          <ArticlesList list={articlesContent} />
        </Row>
      )}
      {loading && (
        <Row>
          <Loader>Loading...</Loader>
        </Row>
      )}
      {articlesContent && loadedArticlesNum < articlesNum && (
        <Row>
          <Button
            type="button"
            disabled={loading}
            onClick={onLoadClickHandler}
          >
            Load more
          </Button>
        </Row>
      )}
    </Section>
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
