export const createGalleryCardTemplate = imgInfo => {
  return `
    <li class="gallery-card">
      <a class="js-gallery-link" href="${imgInfo.largeImageURL}">
        <img 
          class="gallery-img" 
          src="${imgInfo.webformatURL}" 
          alt="${imgInfo.tags}" 
          loading="lazy"
        />
      </a>
      <div class="stats-container">
        <div class="stat">
          <span class="label">Likes</span>
          <span class="value">${imgInfo.likes}</span>
        </div>
        <div class="stat">
          <span class="label">Views</span>
          <span class="value">${imgInfo.views}</span>
        </div>
        <div class="stat">
          <span class="label">Comments</span>
          <span class="value">${imgInfo.comments}</span>
        </div>
        <div class="stat">
          <span class="label">Downloads</span>
          <span class="value">${imgInfo.downloads}</span>
        </div>
      </div>
    </li>
  `;
};
