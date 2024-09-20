import { useEffect } from "react";
import { useCurrentUser } from "../users/providers/UserProvider";
import axios from "axios";

export default function useAxios() {
  const { token } = useCurrentUser();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
  }, [token]);
}
