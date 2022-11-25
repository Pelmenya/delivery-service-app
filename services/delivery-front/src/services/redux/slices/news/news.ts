import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsAPI } from 'api/news-api';
import { countOfBatch } from 'utils/constants/constants';
import { LoadingType } from 'utils/types/loading';
import { INewsItem } from 'utils/types/news-item';
import { Nullable } from 'utils/types/nullable';

export interface INewsList {
    news: Nullable<INewsItem[]>;
    newsLazy: Nullable<INewsItem[]>;
    newsFavorites: INewsItem[] | [];
    step: number;
    maxSteps: number;
}

export interface INewsState extends INewsList, LoadingType {
    error?: string;
}

export const initialNewsState = {
    loading: 'idle',
    news: null,
    newsLazy: null,
    newsFavorites: [],
    step: 0,
    maxSteps: 2,
} as INewsState;

export const fetchNewsData = createAsyncThunk(
    'news/fetchNewsData', async () => await (await newsAPI.getNews()).data as { articles: INewsItem[] },
);

const newsSlice = createSlice({
    name: 'news',
    initialState: initialNewsState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        },
        setInnerId: (state, action: { type: string, payload: INewsItem[] }) => {
            state.news = action.payload;
            state.newsLazy = action.payload.slice(0, countOfBatch);
        },
        setMaxSteps: (state, action) => {
            state.maxSteps = action.payload;
        },
        incrementStep: (state) => {
            state.step += 1;
        },
        addBatchNews: (state, action) => {
            state.newsLazy = action.payload;
        },
        setFavoritesNews: (state, action) => {
            state.newsFavorites = action.payload;
        },
        setLazyNews: (state, action) => {
            state.newsLazy = action.payload;
        },
        setNews: (state, action) => {
            state.news = action.payload;
        },

        refreshNews: (state) => {
            state.loading = 'idle';
            state.news = null;
            state.newsLazy = null;
            state.newsFavorites = [];
            state.step = 0;
            state.maxSteps = 2;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewsData.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {
            state.news = [
                ...action.payload.articles
                    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))];
            state.maxSteps = Math.ceil(action.payload.articles.length / countOfBatch);
            state.step += 1;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const {
    clearError,
    setInnerId,
    addBatchNews,
    setMaxSteps,
    incrementStep,
    setFavoritesNews,
    setLazyNews,
    setNews,
    refreshNews,
} = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
