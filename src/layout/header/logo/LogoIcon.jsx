import { IconButton, useMediaQuery } from "@mui/material";
import React from "react";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
import { useTheme } from "@emotion/react";

export default function LogoIcon() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <NavBarLink to={ROUTES.ROOT} style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton
        sx={{
          borderRadius: isDesktop ? '50%' : '80%',
          position: 'relative',
          left: !isDesktop && '13rem'
        }}

      >
        <video
          width="70"
          height={!isDesktop ? "30" : "70"}
          autoPlay
          muted
          loop
          playsInline
          style={{
            borderRadius: !isDesktop ? '30%' : '70%',

          }}
        >
          <source src="/images/CardWeb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </IconButton>
    </NavBarLink>
  );
}
