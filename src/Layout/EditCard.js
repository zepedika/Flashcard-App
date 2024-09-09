import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckAndCard() {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);

        const cardData = await readCard(cardId, abortController.signal);
        setCard({ ...cardData, deckName: deckData.name });
      } catch (error) {
        console.error(error);
      }
    }

    loadDeckAndCard();

    return () => abortController.abort();
  }, [deckId, cardId]);

  const changeHandler = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ ...card });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (!deck || !card.id) {
    return <div>Loading...</div>;
  }

  return (
    <CardForm
      deckId={deckId}
      card={card}
      handleChange={changeHandler}
      handleSubmit={handleSubmit}
      isEditMode={true}
    />
  );
}

export default EditCard;
