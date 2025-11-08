import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53074697-31effdba198fed340456f0d43';

export async function fetchPhotosByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
    throw new Error('Failed to fetch images. Please try again later.');
  }
}
