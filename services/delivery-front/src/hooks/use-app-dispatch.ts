import { useDispatch } from 'react-redux';
import { AppDispatch } from '../utils/types/app-dispatch';

export const useAppDispatch: () => AppDispatch = useDispatch;