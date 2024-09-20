import React from "react";
import NavBarItem from "../../../routes/components/NavBarItem";
import { Box } from "@mui/material";
import ROUTES from "../../../routes/routesModel";
import { useCurrentUser } from "../../../users/providers/UserProvider";

export default function NotLogged() {
  const { user } = useCurrentUser();

  return (
    <>
      {!user && <Box>
        <NavBarItem label="Signup" to={ROUTES.SIGNUP} />
        <NavBarItem label="Login" to={ROUTES.LOGIN} />
      </Box>}
    </>
  );
}
