import Delete from "./Delete";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listDecks, readDeck } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  const deleteCard = (cardId) => {
    const isConfirmed = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (isConfirmed) {
      const updatedCards = deck.cards.filter((card) => card.id !== cardId);
      setDeck({ ...deck, cards: updatedCards });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError)
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [deckId]);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!deck || !deck.cards || deck.cards.length === 0) {
    return <div>No cards found in this deck.</div>;
  }

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to={`/decks/${deckId}`} className="nav-link active">
          {deck.name}
        </Link>
      </nav>

      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deckId}/edit`}>
            <button type="button" className="btn btn-secondary btn-sm">
              Edit
            </button>
          </Link>
          <Link to={`/decks/${deckId}/study`}>
            <button type="button" className="btn btn-primary btn-sm">
              Study
            </button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button type="button" className="btn btn-primary btn-sm">
              Add Cards
            </button>
          </Link>
          <Delete deckId={deck.id} onDelete={handleDeleteDeck} />
        </div>
      </div>

      <h1>Cards</h1>

      <div className="card-list">
        {deck.cards.map((card) => (
          <div key={card.id} className="card">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
              <p className="card-text">{card.back}</p>
              <div className="button-container">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                  <button type="button" className="btn btn-secondary btn-sm">
                    Edit
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCard(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Deck;
