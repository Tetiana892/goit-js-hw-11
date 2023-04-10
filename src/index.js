import './sass/index.scss';
import { PixabayAPI } from './js/PixabayAPI';
import createGalleryCard from './templates/gallery-cards.hbs';

const galleryEl = document.querySelector('.gallery');
const pixabayApi = new PixabayAPI();

async function onRenderPage(page) {
  try {
    const respons = await pixabayApi.fetchPhotosByQuery(page);
    galleryEl.innerHTML = createGalleryCard(respons.data.hits);
    console.log(respons.data.hits);
  } catch (error) {
    console.log(error);
  }
}
onRenderPage();
