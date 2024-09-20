import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { login } from "../services/usersApiService";
import {
  getUser,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const { setUser, setToken } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const handleLogin = useCallback(async (userLogin) => {
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
      console.log(err);
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    handleLogin,
  };
}
