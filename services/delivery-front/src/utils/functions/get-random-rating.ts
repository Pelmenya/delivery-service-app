const minRating = 0;
const maxRating = 5000;

export const getRandomRating = () => Math.floor(Math.floor(Math.random() * maxRating - 1) + minRating + 1);
