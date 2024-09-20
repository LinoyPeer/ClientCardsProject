import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Cards from "../components/Cards";
import axios from "axios";
import CardsFeedback from "../components/CardsFeedback";
import { useSnack } from "../../providers/SnackbarProvider";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/AddNewCardButton";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function CardsPage() {
  const { user } = useCurrentUser();

  const { cards, error, isLoading, getAllCards, handleDelete, handleLike, filteredCards } =
    useCards();


  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <div>
      <PageHeader
        title="Cards"
        subtitle="On this page you can find all bussines cards from all categories"
      />
      <CardsFeedback
        cards={filteredCards}
        isLoading={isLoading}
        error={error}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
      {user && <AddNewCardButton />}
    </div>

  );
}
