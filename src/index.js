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
    pixabayApi.resetPage(respons.data.total);
    console.log(respons.data.total);
  } catch (error) {
    console.log(error);
  }
}
//  Метод для відображення на яку кнопку натиснули. Подальша підгрузка данних за допомогою пагінації
const createPopularPagination = async event => {
  try {
    const currentPage = event.page;
    // Робимо подальші запити
    const response = await pixabayApi.fetchPhotosByQuery(currentPage);
    // Відмальовуємо розмітку
    galleryEl.innerHTML = createGalleryCard(respons.data.total);
  } catch (error) {
    console.log(err);
  }
};
// додаємо слухача на пагінацію ?????
// pixabayApi.on('afterMore', createPopularPagination); ???????????

onRenderPage();

function onSearch(e) {
  e.preventDefault();

  pixabayApi.query = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.resetPage();
  // galleryEl.innerHTML = '';
  pixabayApi.fetchPhotosByQuery().then(onRenderPage);
}

function onLoadMore() {
  pixabayApi.fetchPhotosByQuery().then(appendMarkup);
  // galleryEl.insertAdjacentElement('beforeend', onRenderPage(data.hits));
  // const totalPages = Math.ceil(data.totalHits / perPage);
}

function appendMarkup(hits) {
  galleryEl.insertAdjacentElement('beforeend', createPopularPagination(hits));
}
