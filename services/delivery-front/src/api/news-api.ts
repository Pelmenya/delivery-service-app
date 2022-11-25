import axios from 'axios';
import { BASE_URL } from 'utils/constants/api-routes';

export interface UserData {
    name: string;
    email: string;
    password: string;
}

class NewsAPI {
    server: string;

    constructor(server: string) {
        this.server = server;
    }

    getNews = async () => axios.get(BASE_URL);
}

export const newsAPI = new NewsAPI(BASE_URL);
