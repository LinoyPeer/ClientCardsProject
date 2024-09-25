import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { login, editUserApi, signup } from "../services/usersApiService";
import {
  getUser,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";
import { normalizeUser } from "../forms/utils/transformUser";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { setUser, setToken } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const loginUser = useCallback(async (userLogin) => {
    setIsLoading(true);
    try {
      const token = await login(userLogin);
      setTokenInLocalStorage(token);
      setToken(token);
      setUser(getUser());
      navigate(ROUTES.CARDS);
    } catch (err) {
      const loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || [];
      loginAttempts.push(new Date().getTime());
      localStorage.setItem("loginAttempts", JSON.stringify(loginAttempts));
      const ONE_HOUR = 60 * 60 * 1000;
      const recentAttempts = loginAttempts.filter(
        (attempt) => new Date().getTime() - attempt < ONE_HOUR
      );
      const MAX_LOGIN_ATTEMPTS = 3;
      if (recentAttempts.length >= MAX_LOGIN_ATTEMPTS) {
        setSnack("error", "You are blocked for 1 hour due to too many failed login attempts.");
        console.log("You are blocked for 1 hour due to too many failed login attempts.");
      }
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, []);

  const registerUser = async (flatUser) => {
    const normalizedUser = normalizeUser(flatUser);
    setIsLoading(true);
    setError(null);
    try {
      const userData = await signup(normalizedUser);
      setSnack("success", "Registration successfully completed!");
      navigate(ROUTES.LOGIN)
      return userData;
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (flatUser, id) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await editUserApi(flatUser, id)
      setSnack("success", "Edit User successfully completed!");
      navigate(ROUTES.CARDS)
      return userData;
    } catch (err) {
      setError(err.message);
      setSnack("error", err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    loginUser,
    registerUser,
    editUser,
  };
}