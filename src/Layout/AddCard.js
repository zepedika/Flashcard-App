import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm"; // Import the CardForm component

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(console.error);
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = { front: card.front, back: card.back };
    try {
      await createCard(deckId, newCard);
      setCard({ front: "", back: "" });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to={`/decks/${deckId}`} className="nav-link">{deck.name}</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="nav-link active">Add Card</Link>
      </nav>

      
      <h1>{deck.name}: Add Card</h1>

      
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        donePath={`/decks/${deckId}`}
      />
    </React.Fragment>
  );
}

export default AddCard;
