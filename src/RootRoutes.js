import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Layout/Home"
import Study from "./Layout/Study"
import CreateDeck from "./Layout/CreateDeck"
import Deck from "./Layout/Deck"
import EditDeck from "./Layout/EditDeck"
import AddCard from "./Layout/AddCard"
import EditCard from "./Layout/EditCard"
import NotFound from "./Layout/NotFound"

function RootRoutes() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/new" element={<CreateDeck />}/>
        <Route path="/decks/:deckId/study" element={<Study />} />
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        <Route path="decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
        <Route path="/decks/:deckId" element={<Deck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
 
  )
}

export default RootRoutes;