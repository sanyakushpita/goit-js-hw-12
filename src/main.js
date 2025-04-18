import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more-btn');
const galleryList = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query.',
      position: 'top-right',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found. Please try again!',
        position: 'top-right',
      });
    } else {
      createGallery(data.hits);
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error fetching images. Please try again!',
      position: 'top-right',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    // Запам’ятовуємо кількість елементів до додавання нових
    const previousItems = document.querySelectorAll('.gallery-item').length;

    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalLoaded = document.querySelectorAll('.gallery-item').length;
    if (totalLoaded >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'top-right',
      });
    }

    scrollToNewImages(previousItems); // прокручуємо до першого нового
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'top-right',
    });
  } finally {
    hideLoader();
  }
});

function scrollToNewImages(previousItemCount) {
  const newItems = document.querySelectorAll('.gallery-item');
  const firstNewItem = newItems[previousItemCount];

  if (firstNewItem) {
    const img = firstNewItem.querySelector('img');

    if (img.complete) {
      firstNewItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      img.onload = () => {
        firstNewItem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };
    }
  }
}
