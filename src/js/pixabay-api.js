export const fetchPhotosByQuery = query => {
  const fetchParams = new URLSearchParams({
    key: '53074697-31effdba198fed340456f0d43',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
  });

  return fetch(`https://pixabay.com/api/?${fetchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
};
