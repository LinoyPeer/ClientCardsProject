import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { useCurrentUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";
import { useSnack } from "../../providers/SnackbarProvider";
import RightNavbar from "../../layout/header/right-navigation/RightNavbar";
import { Typography } from "@mui/material";

export default function FavoriteCards() {
  const { cards, getAllCards, isLoading, error, handleDelete, handleLike } = useCards();
  const { user } = useCurrentUser();
  const [searchParams] = useSearchParams();
  const [filteredCardsOfCards, setFilteredCardsOfCards] = useState([]);
  const setSnack = useSnack();


  useEffect(() => {
    try {
      getAllCards();
      if (filteredCardsOfCards) {
        setSnack("success", "All my favorite cards are here!");
      }
    }
    catch (err) {
      console.log(err);
    }

  }, [getAllCards]);

  useEffect(() => {
    if (!user) return;

    const query = searchParams.get("q")?.toLowerCase() || "";

    const likedCardsOfCurrentUser = cards.filter(card => card.likes.includes(user._id));

    const filtered = likedCardsOfCurrentUser.filter(card =>
      card.title.toLowerCase().includes(query) ||
      card.subtitle.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query)
    );

    setFilteredCardsOfCards(filtered);
  }, [cards, searchParams, user]);

  return (
    <>

      <PageHeader title={"My favorite cards"} subtitle={"Welcome to favorite cards page"} />
      <Typography marginLeft={3}>
        Here you will find the cards you liked
      </Typography>
      <br />
      <br />
      <br />

      <CardsFeedback
        cards={filteredCardsOfCards}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </>
  );
}