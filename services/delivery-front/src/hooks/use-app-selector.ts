import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'utils/types/root-state';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
