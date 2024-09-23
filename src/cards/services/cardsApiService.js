// import axios from "axios";
// import { getToken } from "../../users/services/localStorageService";
// const apiUrl = "http://localhost:8181/cards";

// export const getCards = async () => {
//     try {
//         const response = await axios.get(apiUrl);
//         const data = response.data;
//         return data;
//     } catch (err) {
//         throw new Error(err.message);
//     }
// };

// export const getCard = async (cardId) => {
//     try {
//         const response = await axios.get(`${apiUrl}/${cardId}`);
//         const data = response.data;
//         return data;
//     } catch (err) {
//         throw new Error(err.message);
//     }
// };

// export const getMyCards = async () => {
//     try {
//         const response = await axios.get(`${apiUrl}/my-cards`);
//         const data = response.data;
//         return data;
//     } catch (error) {
//         throw new Error(err.message);
//     }
// };

// export const deleteCard = async (cardId) => {
//     try {
//         const { data } = await axios.delete(`${apiUrl}/${cardId}`);
//         return data;
//     } catch (error) {
//         throw new Error(err.message);
//     }
// };

// export const createCard = async (card) => {
//     try {
//         const { data } = await axios.post(apiUrl, card);
//         return data;
//     } catch (error) {
//         throw new Error(err.message);
//     }
// };

// export const editCard = async (cardId, normalaizedCard) => {
//     try {
//         const { data } = await axios.put(`${apiUrl}/${cardId}`, normalaizedCard);
//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };


// export const changeLikeStatus = async (cardId) => {
//     const TOKEN = getToken();
//     if (!TOKEN) {
//         throw new Error("Authentication token is missing");
//     }

//     let config = {
//         method: 'patch',
//         maxBodyLength: Infinity,
//         url: `${apiUrl}/${cardId}`,
//         headers: {
//             'x-auth-token': `${TOKEN}`,
//         }
//     };

//     try {
//         const response = await axios.request(config);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error.message);
//     }
// };
// console.log(getToken());