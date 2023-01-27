import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function searchImages(query, page = 1) {
  const params = {
    params: {
      key: '30781806-3b92b5450cc5990729c443812',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  };

  const {
    data: { totalHits, hits },
  } = await axios.get(`?q=${query}`, params);

  const normalizedHits = normalizeHits(hits);
  const totalPages = getTotalPages(totalHits);
  return { totalPages, normalizedHits };
}

const normalizeHits = hits => {
  return hits.map(({ id, webformatURL, largeImageURL, tags }) => {
    return { id, webformatURL, largeImageURL, tags };
  });
};

const getTotalPages = totalHits => {
  const imagesPerPage = 12;
  return Math.ceil(totalHits / imagesPerPage);
};
