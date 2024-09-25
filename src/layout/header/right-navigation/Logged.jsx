import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";


export default function Logged() {
  const navigaete = useNavigate();
  const { setUser, user } = useCurrentUser();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  function logOut() {
    localStorage.setItem("my token", undefined);
    setUser(null)
    navigaete(ROUTES.ROOT)
  }

  return (
    <>
      <IconButton
        title="Logout"
        onClick={logOut}
        sx={{
          marginRight: "1em",
          marginLeft: "1em",
        }} >
        <LogoutIcon />
      </IconButton>
      {isDesktop && user && (<IconButton sx={{
        p: 0, display: "inline-flex", marginLeft: 2, marginRight: 2, marginTop: "-0.5em",
      }}>
        <Avatar alt="avatar" src="/images/avatar.png"
          sx={{
            marginTop: "0.5em",
          }} />
      </IconButton>)}
    </>
  );
}