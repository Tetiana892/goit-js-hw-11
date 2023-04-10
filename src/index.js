import './css/styles.css';
import { PixabayAPI } from './js/PixabayAPI';

const pixabayApi = new PixabayAPI();

async function onRenderPage(page) {
  try {
    const respons = await pixabayApi.fetchPhotosByQuery(page);
    console.log(respons.data);
  } catch (error) {
    console.log(error);
  }
}
onRenderPage();
