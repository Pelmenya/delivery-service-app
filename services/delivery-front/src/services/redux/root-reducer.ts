import { combineReducers } from 'redux';
import { newsReducer } from './slices/news/news';

export const rootReducer = combineReducers({
    news: newsReducer,
});
