import { CardContent, Typography } from "@mui/material";
import React from "react";

export default function CardBody({ phone, address, bizNumber }) {
  return (
    <>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Phone: </strong>
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address: </strong>
          {address.city} {address.street} {address.houseNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Card Number: </strong>
          {bizNumber}
        </Typography>
      </CardContent >
    </>
  );
}
