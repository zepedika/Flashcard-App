import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck } from "./../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState(undefined);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    const nextIndex = cardIndex + 1;
    if (nextIndex < deck.cards.length) {
      setCardIndex(nextIndex);
      setIsFlipped(false);
    } else {
      const shouldRestart = window.confirm(
        "Restart cards? Click 'cancel' to return to the home page"
      );
      if (shouldRestart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!deck || !deck.cards) {
    return <div>Loading...</div>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
         <h1>{deck.name}</h1>
        
        <h2>Not enough cards</h2>
        <p>
          This deck contains two or fewer cards. Add more cards to study.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const card = deck.cards[cardIndex];

  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to={`/decks/${deckId}`} className="nav-link">
          {deck.name}
        </Link>
        <Link to={`/decks/${deckId}/study`} className="nav-link active">
          Study
        </Link>
      </nav>

      <h1>Study: {deck.name}</h1>

      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-number">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>

          <div
            className={`card-content ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
          >
            <div className="front">
              <p>{card.front}</p>
            </div>

            <div className="back">
              <p>{card.back}</p>
            </div>
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={handleFlip}
              className="btn btn-secondary btn-sm"
            >
              Flip
            </button>
            {isFlipped && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-sm"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;
