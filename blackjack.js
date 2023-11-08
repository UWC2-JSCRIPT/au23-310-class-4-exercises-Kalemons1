const getDeck = () => {
    const deck = []
    const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  
    for (let index = 0; index < suits.length; index++) {
      // create an array of 13 objects
      for (let j = 1; j <= 13; j++) {
        // for each loop, push a card object to the deck
  
        // special cases for when j > 10
        let displayVal = ''
  
        switch (j) {
          case 1:
            displayVal = 'Ace';
            break;
          case 11:
            displayVal = 'Jack';
            break;
          case 12:
            displayVal = 'Queen';
            break
          case 13:
            displayVal = 'King';
            break
          default: 
            displayVal = j;
        }
  
        const card = {
          val: j,
          displayVal: displayVal,
          suit: suits[index],
        }
  
        if (displayVal === 'Ace') {
          card.val = 11
        }
  
        deck.push(card)
      }
    }
    return deck; 
  }

const blackjackDeck = getDeck();

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

drawCard(card) {
  this.hand.push(card);
}
};
// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer ("House"); // TODO
const player = new CardPlayer ("Kyle"); // TODO

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {

let points = 0;
let numAces = 0;

for (let card of hand) {
    if (card.displayVal === 'Ace') {
        numAces++
        points += 11
    } else if (card.displayVal === 'King' || card.displayVal === 'Queen' || card.displayVal === 'Jack'){
        points += 10;
    } else {
        points += parseInt(card.displayVal);
    }
}

while (numAces > 0 && points > 21) {
    points -= 10;
    numAces--;
  }

  return points;
};
// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
    if (calcPoints(dealerHand).total < 17){
        return true; // Draw another card
      } else {
        return false; // Stand
      }
    };


// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = function(playerScore, dealerScore) {
    if ((playerScore <= 21 && playerScore > dealerScore) || dealerScore > 21) {
      return `Player wins with a score of ${playerScore}`;
    } else if ((dealerScore <= 21 && dealerScore > playerScore) || playerScore > 21) {
      return `The House wins with a score of ${dealerScore}`;
    } else if (dealerScore === playerScore) {
      return `It's a tie! Both the dealer and player have a score of ${playerScore}`;
    } else {
      return `No one wins`;
    }
  };
  

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
 }

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
const showHand = (player) => {
    const displayHand = player.hand.map((card) => card.displayVal).join(', ');
    const playerScore = calcPoints(player.hand).total;
    console.log(`${player.name}'s hand is ${displayHand} (${playerScore})`);
 }

// /**
//  * Runs Blackjack Game
//  */
const startGame = function() {
    player.drawCard(blackjackDeck.pop());
    dealer.drawCard(blackjackDeck.pop());
    player.drawCard(blackjackDeck.pop());
    dealer.drawCard(blackjackDeck.pop());

    let playerScore = calcPoints(player.hand);
showHand(player);

while (playerScore.total < 21 && confirm(getMessage(playerScore.total, dealer.hand[0]))) {
    // Draw a card for the player from the blackjackDeck
    player.drawCard(blackjackDeck.pop());
    playerScore = calcPoints(player.hand); // Update playerScore
    showHand(player);
}

if (playerScore.total > 21) {
    return 'You went over 21 - you lose!';
}
console.log(`Player stands at ${playerScore.total}`);

let dealerScore = calcPoints(dealer.hand);
while (dealerScore.total < 21 && dealerShouldDraw(dealer.hand)) {
    // Draw a card for the dealer from the blackjackDeck
    dealer.drawCard(blackjackDeck.pop());
    dealerScore = calcPoints(dealer.hand); // Update dealerScore
    showHand(dealer);
}

    if (dealerScore > 21) {
        return 'Dealer went over 21 - you win!';
    }
    console.log(`Dealer stands at ${dealerScore}`);

    return determineWinner(playerScore, dealerScore);
}

console.log(startGame());