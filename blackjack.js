let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck;
let canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    runGame();
}

function buildDeck() {
    const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const cardTypes = ["C", "D", "H", "S"];
    deck = [];
    for (const type of cardTypes) {
        for (const value of cardValues) {
            deck.push(`${value}-${type}`);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function runGame() {
    hidden = deck.pop();
    // Deal two cards to the dealer
    for (let i = 0; i < 2; i++) {
        dealCard("dealer");
    }

    // Deal two cards to the player
    for (let i = 0; i < 2; i++) {
        dealCard("player");
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    if (!canHit) {
        document.getElementById("results").innerText = "You lost the game! Can't draw a new card! Please restart the game.";
        return;
    }

    dealCard("player");

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }

    document.getElementById("your-sum").innerText = yourSum;
}

function stay() {
    canHit = false;
    // Add the value of the hidden card to the dealer's sum
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    // Display the hidden card
    document.getElementById("hidden").src = `./images/cards-images/${hidden}.png`;

    displayMessage();

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
}

function displayMessage() {
    let message = "";
    if (yourSum > 21) {
        message = "🚨 You Lose! 🚨";
    }
    else if (dealerSum > 21) {
        message = "🎉 You win! 🎉";
    }
    //both you and dealer <= 21
    else if (yourSum === dealerSum) {
        message = "😐 Tie! 😐";
    }
    else if (yourSum > dealerSum) {
        message = "🎉 You Win! 🎉";
    }
    else if (yourSum < dealerSum) {
        message = "🚨 You Lose! 🚨";
    }

    document.getElementById("results").innerText = message;
}

function dealCard(receiver) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./images/cards-images/${card}.png`;

    if (receiver === "player") {
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    } else {
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
}

function getValue(card) {
    let value = parseInt(card);
    if (isNaN(value)) {
        if (card == "A") {
            return 11;
        }
        return 10;
    }
    return value;
}

function checkAce(card) {
    return card[0] === "A" ? 1 : 0;
}

function reduceAce(sum, aceCount) {
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }
    return sum;
}

function resetGame() {
    location.reload();
}
