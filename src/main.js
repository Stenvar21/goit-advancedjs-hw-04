import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { createGalleryCardTemplate } from './js/render-functions.js';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more'),
};

let lightbox = null;
let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15;
let totalHits = 0;

function showLoader(message = 'Loading images, please wait...') {
  refs.loader.classList.add('is-active');
  refs.loader.textContent = message;
}

function hideLoader() {
  refs.loader.classList.remove('is-active');
  refs.loader.textContent = '';
}

function showLoadMore() {
  refs.loadMoreBtn.style.display = 'block';
}

function hideLoadMore() {
  refs.loadMoreBtn.style.display = 'none';
}

function initOrRefreshLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

async function fetchImages(query, page) {
  try {
    const data = await fetchPhotosByQuery(query, page, PER_PAGE);
    return data;
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topCenter',
      timeout: 3500,
    });
    return { hits: [], totalHits: 0 };
  }
}

function scrollToNewCards() {
  if (currentPage === 1) return;

  const allCards = refs.gallery.querySelectorAll('.gallery-card');
  if (!allCards.length) return;

  const cardWidth = allCards[0].getBoundingClientRect().width;
  const cardHeight = allCards[0].getBoundingClientRect().height;

  const cardsPerRow = Math.floor(refs.gallery.clientWidth / cardWidth);
  const firstNewCardIndex = (currentPage - 1) * PER_PAGE;
  const firstCardOfRow = allCards[firstNewCardIndex];

  if (!firstCardOfRow) return;

  const gap = parseInt(getComputedStyle(refs.gallery).gap) || 24;
  const scrollY =
    window.scrollY + firstCardOfRow.getBoundingClientRect().top - gap;

  window.scrollTo({
    top: scrollY,
    behavior: 'smooth',
  });
}

async function onSearchFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.user_query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query cannot be empty!',
      position: 'topCenter',
      timeout: 2000,
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  refs.gallery.innerHTML = '';
  hideLoadMore();
  showLoader();

  const data = await fetchImages(currentQuery, currentPage);
  const hits = data.hits || [];
  totalHits = data.totalHits;

  hideLoader();

  if (!hits.length) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query.',
      position: 'topCenter',
      timeout: 3500,
    });
    return;
  }

  refs.gallery.insertAdjacentHTML(
    'beforeend',
    hits.map(createGalleryCardTemplate).join('')
  );
  initOrRefreshLightbox();

  if (refs.gallery.children.length < totalHits) showLoadMore();
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();
  hideLoadMore();

  const data = await fetchImages(currentQuery, currentPage);
  const hits = data.hits || [];

  refs.gallery.insertAdjacentHTML(
    'beforeend',
    hits.map(createGalleryCardTemplate).join('')
  );
  initOrRefreshLightbox();
  hideLoader();

  scrollToNewCards();

  if (refs.gallery.children.length < totalHits) {
    showLoadMore();
  } else {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topCenter',
      timeout: 3500,
    });
  }
}

refs.form.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
