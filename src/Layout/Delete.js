import React, { useState } from 'react';

 const Delete = ({ deckId, onDelete }) => {
    const handleDelete = () => {
      const isConfirmed = window.confirm('Delete this Deck? You will not be able to recover it.')
      if(isConfirmed) {
        onDelete(deckId);
      }
    }
    
    return (
      <button type="button" class="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </button>
    )
  }
 
 export default Delete 