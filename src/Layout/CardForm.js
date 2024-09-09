import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, handleChange, handleSubmit, donePath }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Front Textarea */}
      <div>
        <label htmlFor="front">Front</label>
        <textarea
          className="input"
          id="front"
          name="front"
          onChange={handleChange}
          value={card.front}
          placeholder="Front side of card"
        />
      </div>

      {/* Back Textarea */}
      <div>
        <label htmlFor="back">Back</label>
        <textarea
          className="input"
          id="back"
          name="back"
          onChange={handleChange}
          value={card.back}
          placeholder="Back side of card"
        />
      </div>

      <div>
        {/* Link to cancel */}
        <Link to={donePath}>
          <button type="button" className="btn btn-secondary btn-sm">Cancel</button>
        </Link>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-sm" style={{ margin: "5px" }}>
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;
