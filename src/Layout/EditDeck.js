import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api"; // Assuming updateDeck exists and is properly imported

function EditDeck() {
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
        setName(deck.name);
        setDescription(deck.description);
      })
      .catch(console.error);
    return () => abortController.abort();
  }, [deckId]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = {
      ...deck,
      name,
      description,
    };
    await updateDeck(updatedDeck);
    navigate(`/decks/${deckId}`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to={`/decks/${deckId}`} className="nav-link">{deck.name}</Link>
        <Link to={`/decks/${deckId}/edit`} className="nav-link active">Edit Deck</Link>
      </nav>

      <h1>Edit Deck</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea
            className="input"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>

        <div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
          <button type="submit" className="btn btn-primary btn-sm" style={{ margin: "5px" }}>Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditDeck;
