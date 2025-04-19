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

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
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
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);

      const totalPages = Math.ceil(data.totalHits / perPage);
      if (currentPage < totalPages) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Error fetching images. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const previousItems = document.querySelectorAll('.gallery-item').length;
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const totalLoaded = document.querySelectorAll('.gallery-item').length;
    const totalAvailable = data.totalHits;

    if (totalLoaded >= totalAvailable) {
      hideLoadMoreButton();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }

    scrollToNewImages(previousItems);
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
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
