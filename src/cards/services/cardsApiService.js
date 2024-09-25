// (API requests) בקובץ הזה יהיו כל הפונקציות שעוסקות בבקשות לשרת

import axios from "axios";
const apiUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;

export const getAllCardsApi = async () => {
    try {
        let response = await axios.get(
            `${apiUrl}`
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getMyCardsApi = async () => {
    try {
        let response = await axios.get(
            `${apiUrl}/my-cards`
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getCardByIdApi = async (id) => {
    try {
        let response = await axios.get(
            `${apiUrl}/${id}`
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

export const handleDeleteApi = async (id, token) => {
    try {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${apiUrl}/${id}`,
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const handleLikeApi = async (id, token) => {
    try {
        let config = {
            method: 'patch',
            url: `${apiUrl}/${id}`,
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                liked: true,
            }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};