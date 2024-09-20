import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavbar from "./right-navigation/RightNavbar";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <LeftNavBar />
        <RightNavbar mobileSize={"none"} isIconDispaly={true} />
      </Toolbar>
    </AppBar>
  );
}
