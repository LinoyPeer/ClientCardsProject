import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { useCurrentUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";
import { Typography } from "@mui/material";

export default function MyCardsPage() {
  const { cards, getMyCards, isLoading, error, handleDelete, handleLike, filteredCards } = useCards();

  useEffect(() => {
    getMyCards();
  }, [getMyCards]);

  return (
    <>
      <PageHeader title={"My cards"} subtitle={"Welcome to may cards page"} />
      <Typography marginLeft={3}>
        Here you will find the cards you created
      </Typography>
      <br />
      <br />
      <br />
      <CardsFeedback
        cards={filteredCards}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </>
  );
}
