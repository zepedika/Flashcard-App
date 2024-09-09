import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import Header from "./Header";
import Delete from "./Delete";

function Home() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDecks = async () => {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        console.log("Fetched decks:", fetchedDecks);
        setDecks(fetchedDecks);
        setLoading(false); // Set loading to false after decks are fetched
      } catch (error) {
        console.error("Failed to load decks", error);
        setLoading(false);
      }
    };

    fetchDecks();

    return () => abortController.abort();
  }, []);

  const handleDeleteDeck = (deckId) => {
    const updatedDecks = decks.filter((deck) => deck.id !== deckId);
    setDecks(updatedDecks);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <React.Fragment>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          Create Deck
        </button>
      </Link>

      {decks.map((deck) => (
        <div key={deck.id} className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {deck.cards.length} cards
            </h6>
            <p className="card-text">{deck.description}</p>

            <Link to={`/decks/${deck.id}`}>
              <button type="button" className="btn btn-secondary btn-sm">
                View
              </button>
            </Link>

            <Link to={`/decks/${deck.id}/study`}>
              <button type="button" className="btn btn-primary btn-sm">
                Study
              </button>
            </Link>

            <Delete deckId={deck.id} onDelete={handleDeleteDeck} />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Home;
