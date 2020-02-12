import axios from 'axios';
import { fetchArticlesList, fetchArticleContent } from '..';

jest.mock('axios');

describe('Articles services', () => {
  describe('fetchArticlesList', () => {
    it('should do a get request to the /v0/newstories.json endpoint', () => {
      fetchArticlesList();
      expect(axios.get).toHaveBeenCalledWith('/v0/newstories.json');
    });
  });

  describe('fetchArticleContent', () => {
    it('should do a get request to the /v0/item/{id}.json endpoint', () => {
      fetchArticleContent(456);
      expect(axios.get).toHaveBeenCalledWith('/v0/item/456.json');
    });
  });
});
