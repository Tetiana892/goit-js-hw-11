import './sass/index.scss';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from './templates/gallery-cards.hbs';

const galleryEl = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.btn-load-more');

const pixabayApi = new PixabayAPI();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onRenderPage(page) {
  try {
    const respons = await pixabayApi.fetchPhotosByQuery(page);
    galleryEl.innerHTML = createGalleryCard(respons.data.hits);
    // console.log(respons.data.total);
  } catch (error) {
    console.log(error);
  }
}
onRenderPage();

function onSearch(e) {
  e.preventDefault();

  pixabayApi.query = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.resetPage();
  // galleryEl.innerHTML = '';
  pixabayApi.fetchPhotosByQuery().then(appendMarkup);
}

function onLoadMore() {
  pixabayApi.fetchPhotosByQuery().then(appendMarkup);
}

function appendMarkup(cards) {
  galleryEl.insertAdjacentElement('beforeend', createGalleryCard(cards));
}
