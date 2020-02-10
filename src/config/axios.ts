import axios from 'axios';

type Options = {
  baseUrl: string;
}

export default ({ baseUrl }: Options) => {
  axios.defaults.baseURL = baseUrl;
};
