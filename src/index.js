import './sass/index.scss';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from './templates/gallery-cards.hbs';

const galleryEl = document.querySelector('.gallery');

// const options = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 1.0,
// };

const pixabayApi = new PixabayAPI();
// const pagination = new IntersectionObserver(onRenderPage, options);
// const page = pagination.get();

async function onRenderPage(page) {
  try {
    const respons = await pixabayApi.fetchPhotosByQuery(page);
    galleryEl.innerHTML = createGalleryCard(respons.data.hits);
    console.log(respons.data.total);
    // pagination.reset(respons.data.total);
  } catch (error) {
    console.log(error);
  }
}
onRenderPage();
