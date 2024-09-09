import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "./../utils/api";

function CreateDeck({ decks, setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };
    try {
      const createdDeck = await createDeck(newDeck);
      setDecks([...decks, createdDeck]);
      setName("");
      setDescription("");
      navigate(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/decks/new" className="nav-link active">
          Create Deck
        </Link>
      </nav>

      <h1>Create Deck</h1>

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
            placeholder="Deck Name"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <textarea
            className="input"
            type="text"
            id="description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Brief description of the deck"
          />
        </div>

        <div>
          <Link to="/">
            <button type="button" className="btn btn-secondary btn-sm" style={{ margin: "5px" }}>
              Cancel
            </button>
          </Link>

          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;
