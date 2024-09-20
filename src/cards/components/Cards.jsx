import { useCallback } from "react";
import CardComponent from "./card/CardComponent";
import { Container } from "@mui/material";
import useCards from "../hooks/useCards";

export default function Cards({ cards, handleDelete, handleLike }) {

  const { setCards, setCard, setError, setIsLoading, } = useCards();
  const handleEdit = useCallback(async (id) => {
    try {
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
      );
      const editCard = response.data;
      setCard(editCard);
      setCards(prev => prev.map(cardToCheck => {
        if (cardToCheck._id == id) { return cardToCheck }
        console.log(editCard);
        return editCard;
      }));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map((card) => (
        <CardComponent
          card={card}
          key={card._id}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleEdit={handleEdit}
        />
      ))}
    </Container>
  );
}
