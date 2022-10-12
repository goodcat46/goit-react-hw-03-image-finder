import axios from 'axios';

const pixaBayApi = axios.create({
  baseURL: 'https://pixabay.com/',
});

export const getFetchApi = async ({ page = 1, searchQuerry = '' }) => {
  const data = await pixaBayApi.get('api/', {
    params: {
      page: page,
      q: searchQuerry,
      key: '30018207-f47008a7d6e426100d6765bad',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  console.log(data);
  return data;
};
