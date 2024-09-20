import React from "react";
import { Box, Typography } from "@mui/material";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";

export default function Logo() {
  return (
    <>
      <NavBarLink to={ROUTES.ROOT} h>
        <Box sx={{ marginLeft: '1rem', }}>
          <Typography
            variant="h4" sx={{
              marginRight: 2,
              fontFamily: "Segoe UI Emoji",
              display: {
                xs: "none", md: "inline-flex", marginRight: '-10px', fontSize: "30px", fontWeight: "800", color: "#000", textShadow: "-2px 1px 2px", WebkitTextStroke: '1px #ECE3CB',
              },
            }}
          >
            U
          </Typography>
          <Typography
            variant="h4" sx={{
              marginRight: 2,
              fontFamily: "Segoe UI Emoji",
              display: {
                xs: "none", md: "inline-flex", marginRight: '3vw', marginLeft: '1vw', fontSize: "30px", letterSpacing: "2px",
              },
            }}
          >
            cards
          </Typography>
        </Box>
      </NavBarLink >
    </>
  );
}
