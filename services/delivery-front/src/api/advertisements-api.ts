import axios from 'axios';
import { ROUTES } from './routes';

const { BACK_URL = 'http://localhost' } = process.env;
const { API, ADVERTISEMENTS, ID } = ROUTES;
export interface UserData {
    name: string;
    email: string;
    password: string;
}

class AdvertisementsAPI {
    server: string;

    constructor(server: string) {
        this.server = server;
    }

    getAdvertisements = async () => axios.get(`${this.server}${API}${ADVERTISEMENTS}`);

}



export const advertisementsAPI = new AdvertisementsAPI(BACK_URL);
