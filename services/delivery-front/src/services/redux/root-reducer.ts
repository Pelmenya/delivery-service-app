import { combineReducers } from 'redux';
import { advertisementsReducer } from './slices/advertisements/advertisements';

export const rootReducer = combineReducers({
    advertisements: advertisementsReducer,
});
