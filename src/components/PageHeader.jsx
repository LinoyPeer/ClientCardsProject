import { Divider, Typography } from "@mui/material";
import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <>
      <Typography variant="h2" component="h1" sx={{ ml: 3 }}>
        {title}
      </Typography>
      <Typography variant="h5" component="h2" sx={{ ml: 3 }}>
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
