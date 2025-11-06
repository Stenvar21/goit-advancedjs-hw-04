import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotosByQuery } from "./js/pixabay-api.js";
import { createGalleryCardTemplate } from "./js/render-functions.js";

const refs = {
  form: document.querySelector(".js-search-form"),
  gallery: document.querySelector(".js-gallery"),
  loader: document.querySelector(".js-loader"),
};

let lightbox = null;

function showLoader(message = "Loading images, please wait...") {
  refs.loader.classList.add("is-active");
  refs.loader.textContent = message;
}
function hideLoader() {
  refs.loader.classList.remove("is-active");
  refs.loader.textContent = "";
}

function initOrRefreshLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox(".js-gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

async function onSearchFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.user_query.value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Search query cannot be empty!",
      position: "topCenter",
      timeout: 2000,
    });
    return;
  }

  refs.gallery.innerHTML = "";
  showLoader();

  try {
    const data = await fetchPhotosByQuery(query);

    const hits = Array.isArray(data.hits) ? data.hits : [];

    if (hits.length === 0) {
      iziToast.error({
        title: "Error",
        message:
          "Sorry, there are no images matching your search query. Please, try again!",
        position: "topCenter",
        timeout: 3500,
      });
      return;
    }

    const markup = hits.map(item => createGalleryCardTemplate(item)).join("");
    refs.gallery.insertAdjacentHTML("beforeend", markup);

    initOrRefreshLightbox();
  } catch (err) {
    console.error("Fetch error:", err);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please, try again later.",
      position: "topCenter",
      timeout: 3500,
    });
  } finally {
    hideLoader();
    refs.form.reset();
  }
}

refs.form.addEventListener("submit", onSearchFormSubmit);
