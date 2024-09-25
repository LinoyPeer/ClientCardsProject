import axios from "axios";
import { normalizeUser } from "../forms/utils/transformUser";

const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

const getConfig = () => {
  let token = localStorage.getItem('my token');
  return {
    headers: {
      'x-auth-token': `${token}`,
      'Content-Type': 'application/json'
    }
  };
}

export const login = async (userLogin) => {
  try {
    const response = await axios.post(apiUrl + "/login", userLogin);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(apiUrl, normalizedUser);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editUserApi = async (flatUser, id) => {
  const normalizedUser = normalizeUser(flatUser);
  try {
    const { data } = await axios.put(`${apiUrl}/${id}`, normalizedUser, getConfig())
    // return data;
  } catch (error) {
    throw new Error(error.message);
  }
}