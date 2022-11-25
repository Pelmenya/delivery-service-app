import { useDispatch } from 'react-redux';
import { getNewsState } from 'services/redux/selectors/news/news';
import { setFavoritesNews, setLazyNews, setNews } from 'services/redux/slices/news/news';
import { useAppSelector } from './use-app-selector';

export const useFavoritesNews = (isFavorite: boolean | undefined, innerId: string) => {
    const dispatch = useDispatch();
    const { newsLazy, news, newsFavorites } = useAppSelector(getNewsState);

    const handlerOnCLickFavoriteIcon = () => {
        if (isFavorite) {
            dispatch(setLazyNews(newsLazy?.map((item) => {
                if (item.innerId === innerId) {
                    return { ...item, isFavorite: false };
                }
                return item;
            })));
            dispatch(setNews(news?.map((item) => {
                if (item.innerId === innerId) {
                    return { ...item, isFavorite: false };
                }
                return item;
            })));
            if (newsFavorites instanceof Array) {
                const delElementIndex = newsFavorites.findIndex((item) => item.innerId === innerId);
                const arr = [...newsFavorites];
                arr.splice(delElementIndex, 1);
                dispatch(setFavoritesNews([...arr]));
            }
        } else {
            dispatch(setLazyNews(newsLazy?.map((item) => {
                if (item.innerId === innerId) {
                    return { ...item, isFavorite: true };
                }
                return item;
            })));
            dispatch(setNews(news?.map((item) => {
                if (item.innerId === innerId) {
                    return { ...item, isFavorite: true };
                }
                return item;
            })));
            if (newsFavorites) {
                dispatch(setFavoritesNews([...newsFavorites, newsLazy?.find((item) => item.innerId === innerId)]));
            } else dispatch(setFavoritesNews([newsLazy?.find((item) => item.innerId === innerId)]));
        }
    };

    return { handlerOnCLickFavoriteIcon };
};
