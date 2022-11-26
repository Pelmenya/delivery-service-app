const serverUrlAdvertisements = 'https://nomoreparties.co/news/v2/everything';
// const serverUrlAdvertisements = 'https://newsapi.org/v2/everything';

const apiKeyAdvertisements = '45a6a26cce284a36ba341837300b2c6b';
const pageSizeAdvertisements = 100;
const numberOfDays = 30;
const keyWord = 'Apple';
const date = new Date();
const from = new Date(+date - 3600 * 24 * 1000 * numberOfDays).toISOString().slice(0, 19);
const to = date.toISOString().slice(0, 19);
export const BASE_URL = `
    ${serverUrlAdvertisements}?q=${keyWord}&pageSize=${pageSizeAdvertisements}&from=${from}&to=${to}&apiKey=${apiKeyAdvertisements}
`;

// export const BASE_URL = 'https://saurav.tech/AdvertisementsAPI/everything/cnn.json';
