import axios from 'axios';
export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '35202570-a98fb6affeab795733fe4a227';
  #query = '';

  fetchPhotosByQuery(page) {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        q: this.#query,
        page: 1,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: ' true',
        key: this.#API_KEY,
      },
    });
  }
  // return fetch(url).then(data => {
  //   this.incrementPage();
  //   return data.json();
  // });

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
