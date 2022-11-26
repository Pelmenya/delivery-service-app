import axios from 'axios';

export interface UserData {
    name: string;
    email: string;
    password: string;
}

const { BACK_URL } = process.env
console.log(BACK_URL)

class AdvertisementsAPI {
    server: string;

    constructor(server: string) {
        this.server = server;
    }

    getAdvertisements = async () => axios.get(`${BACK_URL}/api/adverisements`);
}



export const advertisementsAPI = new AdvertisementsAPI('');
