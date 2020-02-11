import axios from 'axios';
import { fetchArticlesList } from '..';

jest.mock('axios');

describe('Articles services', () => {
  describe('fetchArticlesList', () => {
    it('should do a get request to the /v0/newstories.json endpoint', () => {
      fetchArticlesList();
      expect(axios.get).toHaveBeenCalledWith('/v0/newstories.json');
    });
  });
});
