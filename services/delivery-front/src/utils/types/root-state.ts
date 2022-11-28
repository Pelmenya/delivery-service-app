import { store } from '../../services/redux/store';

export type RootState = ReturnType<typeof store.getState>;
