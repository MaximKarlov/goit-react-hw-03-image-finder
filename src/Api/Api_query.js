import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33398845-ceea68c8fd971c39a472032d7';
const FILTER = '&image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = '&per_page=12';

export const serching = (searchPhoto, PAGES) => {
  const response = axios(`${ENDPOINT}?key=${KEY}&q=${searchPhoto}${FILTER}${PER_PAGE}&page=${PAGES}`);
  //   .then(data => {
  //   return data;
  // });
  return response;
};

const api = { serching };

export default api;
