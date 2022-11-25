const serverUrlNews = 'https://nomoreparties.co/news/v2/everything';
// const serverUrlNews = 'https://newsapi.org/v2/everything';

const apiKeyNews = '45a6a26cce284a36ba341837300b2c6b';
const pageSizeNews = 100;
const numberOfDays = 30;
const keyWord = 'Apple';
const date = new Date();
const from = new Date(+date - 3600 * 24 * 1000 * numberOfDays).toISOString().slice(0, 19);
const to = date.toISOString().slice(0, 19);
export const BASE_URL = `
    ${serverUrlNews}?q=${keyWord}&pageSize=${pageSizeNews}&from=${from}&to=${to}&apiKey=${apiKeyNews}
`;

// export const BASE_URL = 'https://saurav.tech/NewsAPI/everything/cnn.json';
