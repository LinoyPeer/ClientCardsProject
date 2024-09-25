import { useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useCallback, useEffect, useState } from "react";
import { getAllCardsApi, getCardByIdApi, getMyCardsApi, handleDeleteApi, handleLikeApi } from "../services/cardsApiService";
import useAxios from "../../hooks/useAxios";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [query, setQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(null);
  const [searchParams] = useSearchParams();
  const setSnack = useSnack();
  const { token, user } = useCurrentUser();
  useAxios();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);
  useEffect(() => {
    if (cards) {
      setFilteredCards(
        cards.filter(
          card =>
            card.title.includes(query) || String(card.bizNumber).includes(query)
        )
      )
    }
  }, [cards, query]);

  const getAllCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const cardsData = await getAllCardsApi();
      if (cardsData) {
        setCards(cardsData);
        setSnack("success", "All the cards are here!");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, setCards]);

  const getMyCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const myCardsData = await getMyCardsApi();
      if (myCardsData) {
        setCards(myCardsData);
        setSnack("success", "All my cards are here!");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, setCards]);

  const getCardById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const cardById = await getCardByIdApi(id);
      if (cardById) {
        setCard(cardById);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, setCard]);


  const handleDelete = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const data = await handleDeleteApi(id, token);
        setCard(data);
        setCards((prev) => prev.filter((cardToCheck) => cardToCheck._id !== id));
        setSnack("success", `You deleted the card: ${data.title} `);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [cards, token, setSnack]
  );

  const handleLike = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const newCard = await handleLikeApi(id, token);
        setCard(newCard);
        setCards(prev => prev.map(cardToCheck => {
          if (cardToCheck._id !== id) { return cardToCheck; }
          return newCard;
        }));
        if (newCard.likes.includes(user._id)) {
          setSnack("success", `You liked the card: ${newCard.title}`);
        } else {
          setSnack("success", `You unliked the card: ${newCard.title}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [token, setSnack, user]
  );

  return {
    cards,
    card,
    error,
    setError,
    setIsLoading,
    isLoading,
    filteredCards,
    setFilteredCards,
    getAllCards,
    getMyCards,
    getCardById,
    handleDelete,
    handleLike,
  }
}