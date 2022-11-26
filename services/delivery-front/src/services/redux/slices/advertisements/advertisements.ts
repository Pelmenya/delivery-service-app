import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countOfBatch } from '../../../../utils/constants/constants';
import { LoadingType } from '../../../../utils/types/loading';
import { IAdvertisementData } from '../../../../utils/types/i-advertisement-data';
import { Nullable } from '../../../../utils/types/nullable';
import { advertisementsAPI } from '../../../../api/advertisements-api';

export interface IAdvertisementsList {
    advertisements: Nullable<IAdvertisementData[]>;
    advertisementsLazy: Nullable<IAdvertisementData[]>;
    advertisementsFavorites: IAdvertisementData[] | [];
    step: number;
    maxSteps: number;
}

export interface IAdvertisementsState extends IAdvertisementsList, LoadingType {
    error?: string;
}

export const initialAdvertisementsState = {
    loading: 'idle',
    advertisements: null,
    advertisementsLazy: null,
    advertisementsFavorites: [],
    step: 0,
    maxSteps: 2,
} as IAdvertisementsState;

export const fetchAdvertisementsData = createAsyncThunk(
    'advertisements/fetchAdvertisementsData', async () => await (await advertisementsAPI.getAdvertisements()).data as { articles: IAdvertisementData[] },
);

const advertisementsSlice = createSlice({
    name: 'advertisements',
    initialState: initialAdvertisementsState,
    reducers: {
        clearError: (state) => {
            state.error = undefined;
        },
        setInnerId: (state, action: { type: string, payload: IAdvertisementData[] }) => {
            state.advertisements = action.payload;
            state.advertisementsLazy = action.payload.slice(0, countOfBatch);
        },
        setMaxSteps: (state, action) => {
            state.maxSteps = action.payload;
        },
        incrementStep: (state) => {
            state.step += 1;
        },
        addBatchAdvertisements: (state, action) => {
            state.advertisementsLazy = action.payload;
        },
        setFavoritesAdvertisements: (state, action) => {
            state.advertisementsFavorites = action.payload;
        },
        setLazyAdvertisements: (state, action) => {
            state.advertisementsLazy = action.payload;
        },
        setAdvertisements: (state, action) => {
            state.advertisements = action.payload;
        },

        refreshAdvertisements: (state) => {
            state.loading = 'idle';
            state.advertisements = null;
            state.advertisementsLazy = null;
            state.advertisementsFavorites = [];
            state.step = 0;
            state.maxSteps = 2;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdvertisementsData.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(fetchAdvertisementsData.fulfilled, (state, action) => {
            state.advertisements = action.payload.articles;
            state.maxSteps = Math.ceil(action.payload.articles.length / countOfBatch);
            state.step += 1;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchAdvertisementsData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const {
    clearError,
    setInnerId,
    addBatchAdvertisements,
    setMaxSteps,
    incrementStep,
    setFavoritesAdvertisements,
    setLazyAdvertisements,
    setAdvertisements,
    refreshAdvertisements,
} = advertisementsSlice.actions;
export const advertisementsReducer = advertisementsSlice.reducer;
