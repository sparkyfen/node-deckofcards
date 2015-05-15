'use strict';

var deckofcards = require('node-deckofcards');

deckofcards.newDeck(function (error, result) {
  if(error) {
    return console.log(error);
  }
  var remaining = result.remaining;
  var deckId = result.deck_id;
  deckofcards.drawCard(deckId, 2, function (error, result) {
    if(error) {
      return console.log(error);
    }
    remaining = result.remaining;
    // Remove the extra images.
    var cards = result.cards.map(function (card) {
      delete card.images;
      return card;
    });
    // Do something with the drawn cards.
  });
});

// Shuffle 6 decks.
deckofcards.shuffle(6, function (error, result) {
  if(error) {
    return console.log(error);
  }
  var remaining = result.remaining;
  var deckId = result.deck_id;
  // Draw 2 cards.
  deckofcards.drawCard(deckId, 2, function (error, result) {
    if(error) {
      return console.log(error);
    }
    remaining = result.remaining;
    // Remove the extra images.
    var cards = result.cards.map(function (card) {
      delete card.images;
      return card;
    });
    // Do something with the drawn cards.
  });
});