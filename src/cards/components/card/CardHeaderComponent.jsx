import { CardHeader, CardMedia, Divider } from "@mui/material";
import React from "react";

export default function CardHeaderComponent({ image, alt, title, subtitle }) {
  return (
    <>
      <CardMedia sx={{ height: 140 }} image={image} alt={alt} />
      <CardHeader title={title} subheader={subtitle} />
      <Divider variant="middle" />
    </>
  );
}
