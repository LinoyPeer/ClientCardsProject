import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardHeader } from "@mui/material";
import CardHeaderComponent from "./CardHeaderComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

export default function CardComponent({
  card,
  handleDelete,
  handleEdit,
  handleLike,
}) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 250, m: "auto", mb: 3 }}>
      <CardActionArea
        onClick={() => navigate(ROUTES.CARD_INFO + "/" + card._id)}
      >
        <CardHeaderComponent
          image={card.image.url}
          alt={card.image.alt}
          title={card.title}
          subtitle={card.subtitle}
        />

        <CardBody
          phone={card.phone}
          address={card.address}
          bizNumber={card.bizNumber}
        />
      </CardActionArea>

      <CardActionBar
        userId={card.user_id}
        cardId={card._id}
        handleDelete={handleDelete}
        handleLike={handleLike}
        handleEdit={handleEdit}
        likes={card.likes}
        phone={card.phone}
      />
    </Card>
  );
}
