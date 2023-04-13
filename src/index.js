import './sass/index.scss';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from './templates/gallery-cards.hbs';

const galleryEl = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.btn-load-more');

const pixabayApi = new PixabayAPI();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.query = searchQuery;
  pixabayApi.resetPage();
  pixabayApi.page = 1;
  if (searchQuery === '') {
    alert('Error');
    return;
  }
  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    createMarkup(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  pixabayApi.page += 1;
  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    console.log(response.data.hits);
    createMarkup(response.data.hits);
  } catch (err) {
    console.log(err);
  }
  // console.log(pixabayApi.page);
}

function createMarkup(images) {
  const markup = images
    .map(image => {
      const {
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');
  // const respons = pixabayApi.fetchPhotosByQuery(page);
  // const markup = createGalleryCard(arr);
  galleryEl.insertAdjacentElement('beforeend', markup);
}
