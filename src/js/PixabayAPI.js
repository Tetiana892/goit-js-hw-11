import axios from 'axios';
export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '35202570-a98fb6affeab795733fe4a227';
  #query = '';

  getPopularPhotos(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        q,
        page: '1',
        per_page: '40',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: ' true',
        key: this.#API_KEY,
      },
    });
  }

  fetchPhotosByQuery(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        q: this.#query,
        page: '1',
        per_page: '40',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: ' true',
        key: this.#API_KEY,
      },
    });
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
