import { useCallback, useEffect, useState } from "react";
import { useSnack } from "../../providers/SnackbarProvider";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useSearchParams } from "react-router-dom";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [query, setQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(null);
  const [searchParams] = useSearchParams();
  const setSnack = useSnack();
  const { token } = useCurrentUser();


  const apiUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;

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
    try {
      let response = await axios.get(
        `${apiUrl}`
      );
      setCards(response.data);
      setSnack("success", "All cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getMyCards = useCallback(async () => {
    try {
      let response = await axios.get(
        `${apiUrl}/my-cards`
      );
      setCards(response.data);
      setSnack("success", "All my cards are here!");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const getCardById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/${id}`
      );
      const data = response.data;
      setCard(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleDelete = useCallback(async (id) => {
    const cardToDelete = cards.find(card => card._id === id);

    if (!cardToDelete) {
      throw new Error("Card not found");
    }

    let data = JSON.stringify({
      "bizNumber": cardToDelete.bizNumber,
    });
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${apiUrl}/${id}`,
      headers: {
        'x-auth-token': `${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCard(response.data);
        console.log("Card " + id + " deleted");
        setCards(prev => prev.filter(cardToCheck => cardToCheck._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }, [cards, token]);


  const handleLike = useCallback(async (id) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/${id}`
      );
      const newCard = response.data;
      setCard(newCard);
      setCards(prev => prev.map(cardToCheck => {
        if (cardToCheck._id !== id) { return cardToCheck }
        return newCard;
      }));

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    filteredCards,
    setFilteredCards,
    cards,
    card,
    error,
    setError,
    setIsLoading,
    isLoading,
    getAllCards,
    getCardById,
    handleDelete,
    handleLike,
    getMyCards,
  };
}
