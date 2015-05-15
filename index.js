'use strict';

var request = require('request').defaults({
  headers: {
    'User-Agent': 'node-deckofcards/v0.1'
  }
});
var _ = require('lodash');

var CARDS = ['AS','2S','3S','4S','5S','6S','7S','8S','9S','0S','JS','QS','KS','AD','2D','3D','4D','5D','6D','7D','8D','9D','0D','JD','QD','KD','AC','2C','3C','4C','5C','6C','7C','8C','9C','0C','JC','QC','KC','AH','2H','3H','4H','5H','6H','7H','8H','9H','0H','JH','QH','KH'];


// http://deckofcardsapi.com/api/shuffle/?deck_count=<number>
exports.shuffle = function (deckCount, callback) {
  if(isNaN(deckCount)) {
    if(callback === undefined) {
      callback = deckCount;
    }
    return callback(new Error('Invalid deck count, must be a number.'));
  }
  request.get('http://deckofcardsapi.com/api/shuffle/?deck_count=' + deckCount, {
    json: true
  }, function (error, response, body) {
    if(error) {
      return callback(error);
    }
    if(response.statusCode !== 200 || (body && !body.success)) {
      return callback(new Error(body));
    }
    return callback(null, body);
  });
};

// http://deckofcardsapi.com/api/draw/<deck_id>/?count=<number>
exports.drawCard = function (deckId, cardCount, callback) {
  if(typeof(deckId) !== 'string') {
    if(callback === undefined) {
      callback = cardCount;
    }
    return callback(new Error('Invalid deck id, must be a string.'));
  }
  if(isNaN(cardCount)) {
    if(callback === undefined) {
      callback = cardCount;
    }
    return callback(new Error('Invalid card count, must be a number.'));
  }
  request.get('http://deckofcardsapi.com/api/draw/' + deckId + '/?count=' + cardCount, {
    json: true
  }, function (error, response, body) {
    if(error) {
      return callback(error);
    }
    if(response.statusCode !== 200 || (body && !body.success)) {
      return callback(new Error(body));
    }
    return callback(null, body);
  });
};

// http://deckofcardsapi.com/api/shuffle/<deck_id>/
exports.reshuffle = function (deckId, callback) {
  if(typeof(deckId) !== 'string') {
    if(callback === undefined) {
      callback = deckId;
    }
    return callback(new Error('Invalid deck id, must be a string.'));
  }
  request.get('http://deckofcardsapi.com/api/shuffle/' + deckId, {
    json: true
  }, function (error, response, body) {
    if(error) {
      return callback(error);
    }
    if(response.statusCode !== 200 || (body && !body.success)) {
      return callback(new Error(body));
    }
    return callback(null, body);
  });
};

// http://deckofcardsapi.com/api/new/
exports.newDeck = function (callback) {
  request.get('http://deckofcardsapi.com/api/new/', {
    json: true
  }, function (error, response, body) {
    if(error) {
      return callback(error);
    }
    if(response.statusCode !== 200 || (body && !body.success)) {
      return callback(new Error(body));
    }
    return callback(null, body);
  });
};

// http://deckofcardsapi.com/api/shuffle/?cards=<cards>
exports.partialDeck = function (cards, callback) {
  if(!(cards instanceof Array)) {
    if(callback === undefined) {
      callback = cards;
    }
    return callback(new Error('Invalid cards, must be an array.'));
  }
  var cardDiff = _.difference(cards, CARDS);
  if(cardDiff.length > 0) {
    return callback(new Error('One or more cards are invalid.'));
  }
  var cardQuery = cards.join(',');
  request.get('http://deckofcardsapi.com/api/shuffle/?cards=' + cardQuery, {
    json: true
  }, function (error, response, body) {
    if(error) {
      return callback(error);
    }
    if(response.statusCode !== 200 || (body && !body.success)) {
      return callback(new Error(body));
    }
    return callback(null, body);
  });
}