import moment from 'moment';
import 'moment/locale/ru';

export const formatTime = (time: moment.MomentInput) => {
    moment.locale('ru');
    return moment(time).calendar();
};
