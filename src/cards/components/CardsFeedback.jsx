import React from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { Typography } from "@mui/material";
import Cards from "./Cards";
import CardActionBar from "./card/CardActionBar";
import useCards from "../hooks/useCards";

export default function CardsFeedback({
  isLoading,
  cards,
  error,
  handleDelete,
  handleLike,
}) {
  const { card } = useCards();

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && cards.length === 0)
    return (
      <Typography m={2}>
        Oops... it seems there are no business cards to display
      </Typography>
    );

  if (cards)
    return (
      <Cards
        cards={cards}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    );
  <CardActionBar
    userId={card.userId}
    cardId={card._id}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    handleLike={handleLike}
    likes={card.likes}
    phone={card.phone}
  />

  { user && <AddNewCardButton /> }

  return null;
}
