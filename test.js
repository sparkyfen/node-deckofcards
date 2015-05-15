'use strict';

var deckofcards = require('./index');
var should = require('should');
var nock = require('nock');
nock.disableNetConnect();

describe('Deck of Cards API', function () {
  describe('GET /api/shuffle', function () {
    it('should successfully shuffle 1 deck', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/shuffle/?deck_count=1')
      .reply(200, {
        "remaining": 52,
        "success": true,
        "deck_id": "testDeckId",
        "shuffled": false
      });
      deckofcards.shuffle(1, function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(52);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        results.shuffled.should.be.false;
        done();
      });
    });


    it('should successfully shuffle 6 desks', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/shuffle/?deck_count=6')
      .reply(200, {
        "remaining": 312,
        "success": true,
        "deck_id": "testDeckId",
        "shuffled": false
      });
      deckofcards.shuffle(6, function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(312);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        results.shuffled.should.be.false;
        done();
      });
    });


    it('should fail if the deck count is missing', function (done) {
      deckofcards.shuffle(function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the deck count isNaN', function (done) {
      deckofcards.shuffle(NaN, function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the deck count is not a number', function (done) {
      deckofcards.shuffle('foobar', function (error, results) {
        error.should.be.defined;
        done();
      });
    });
  });

  describe('GET /api/draw', function () {
    it('should draw a card from a known deck id', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/draw/testDeckId/?count=1')
      .reply(200, {
        "cards": [{
          "suit": "SPADES",
          "image": "http://deckofcardsapi.com/static/img/0S.png",
          "images": {"png": "http://deckofcardsapi.com/static/img/0S.png",
          "svg": "http://deckofcardsapi.com/static/img/0S.svg"},
          "value": "10"
        }],
        "remaining": 51,
        "success": true,
        "deck_id": "testDeckId"
      });
      deckofcards.drawCard('testDeckId', 1, function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(51);
        results.cards.length.should.equal(1);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        done();
      });
    });

    it('should draw three cards from a known deck id', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/draw/testDeckId/?count=3')
      .reply(200, {
        "cards": [{
          "suit": "DIAMONDS",
          "image": "http://deckofcardsapi.com/static/img/2D.png",
          "images": {
            "png": "http://deckofcardsapi.com/static/img/2D.png",
            "svg": "http://deckofcardsapi.com/static/img/2D.svg"
          },
          "value": "2"
        }, {
          "suit": "HEARTS",
          "image": "http://deckofcardsapi.com/static/img/2H.png",
          "images": {
            "png": "http://deckofcardsapi.com/static/img/2H.png",
            "svg": "http://deckofcardsapi.com/static/img/2H.svg"
          },
          "value": "2"
        }, {
          "suit": "HEARTS",
          "image": "http://deckofcardsapi.com/static/img/9H.png",
          "images": {
            "png": "http://deckofcardsapi.com/static/img/9H.png",
            "svg": "http://deckofcardsapi.com/static/img/9H.svg"
          },
          "value": "9"}],
          "remaining": 49,
          "success": true,
          "deck_id": "testDeckId"
      });
      deckofcards.drawCard('testDeckId', 3, function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(49);
        results.cards.length.should.equal(3);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        done();
      });
    });

    it('should fail if the deck id is missing', function (done) {
      deckofcards.drawCard(3, function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the deck id is not a string', function (done) {
      deckofcards.drawCard(false, 3, function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the card count is missing', function (done) {
      deckofcards.drawCard('testDeckId', function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the card count isNaN', function (done) {
      deckofcards.drawCard('testDeckId', NaN, function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the card count not a number', function (done) {
      deckofcards.drawCard('testDeckId', 'foobar', function (error, results) {
        error.should.be.defined;
        done();
      });
    });
  });

  describe('GET /api/shuffle', function () {
    it('should successfully reshuffle an existing deck id', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/shuffle/testDeckId')
      .reply(200, {
        "remaining": 52,
        "success": true,
        "deck_id": "testDeckId",
        "shuffled": false
      });
      deckofcards.reshuffle('testDeckId', function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(52);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        results.shuffled.should.be.false;
        done();
      });
    });

    it('should fail on a non-existing deck', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/shuffle/foobar/')
      .reply(200, {
        "success": false,
        "error": "Deck ID does not exist."
      });
      deckofcards.reshuffle('foobar', function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail on a missing deck id', function (done) {
      deckofcards.reshuffle(function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail on an invalid deck id', function (done) {
      deckofcards.reshuffle(false, function (error, results) {
        error.should.be.defined;
        done();
      });
    });
  });

  describe('GET /api/new', function () {
    it('should successfully get a new deck of cards', function (done) {
      nock('http://deckofcardsapi.com')
      .get('/api/new/')
      .reply(200, {
        "remaining": 52,
        "success": true,
        "deck_id": "testDeckId"
      });
      deckofcards.newDeck(function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(52);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        done();
      });
    });
  });

  describe('GET /api/shuffle', function () {
    it('should successfully get a partial deck', function (done) {
      var cards = ['AS','2S','KS','AD','2D','KD','AC','2C','KC','AH','2H','KH'];
      nock('http://deckofcardsapi.com')
      .get('/api/shuffle/?cards=' + cards.join(','))
      .reply(200, {
        "remaining": 12,
        "success": true,
        "deck_id": "testDeckId",
        "shuffled": false
      });
      deckofcards.partialDeck(cards, function (error, results) {
        if(error) {
          return done(error);
        }
        results.remaining.should.equal(cards.length);
        results.success.should.be.true;
        results.deck_id.should.equal('testDeckId');
        done();
      });
    });

    it('should fail if a card is not a real card', function (done) {
      var cards = ['AS','2S','KS','AD','2D','KD','AC','2C','KC','FO','2H','KH'];
      deckofcards.partialDeck(cards, function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the cards are missing', function (done) {
      deckofcards.partialDeck(function (error, results) {
        error.should.be.defined;
        done();
      });
    });

    it('should fail if the cards are invalid', function (done) {
      deckofcards.partialDeck(false, function (error, results) {
        error.should.be.defined;
        done();
      });
    });
  });
});