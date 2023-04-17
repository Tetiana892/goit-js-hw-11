import './sass/index.scss';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from './templates/gallery-cards.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onScroll, onToTopBtn } from './js/scroll';

const galleryEl = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.btn-load-more');

const pixabayApi = new PixabayAPI();

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

onScroll();
onToTopBtn();

async function onSearch(e) {
  e.preventDefault();

  galleryEl.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  pixabayApi.query = searchQuery;

  pixabayApi.resetPage();
  pixabayApi.page = 1;

  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const totalPicturs = response.data.totalHits;

    if (totalPicturs === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    createMarkup(response.data.hits);
    lightbox.refresh();
    scrollPage();
    Notiflix.Notify.success(`Hooray! We found ${totalPicturs} images.`);

    if (totalPicturs < 40) {
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  pixabayApi.page += 1;
  try {
    const response = await pixabayApi.fetchPhotosByQuery();

    createMarkup(response.data.hits);
    lightbox.refresh();
    scrollPage();

    if (response > response.data.hits) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.classList.add('is-hidden');
  }
}

function createMarkup(hits) {
  const markup = createGalleryCard(hits);
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
