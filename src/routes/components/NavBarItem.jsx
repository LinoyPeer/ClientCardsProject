import React from "react";
import NavBarLink from "./NavBarLink";
import { Button, Typography } from "@mui/material";

export default function NavBarItem({ to, sx, label, disabled }) {
  return (
    <NavBarLink to={to} sx={sx} disabled={disabled}>
      <Button color="inherit">
        <Typography>{label}</Typography>
      </Button>
    </NavBarLink>
  );
}
