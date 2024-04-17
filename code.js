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
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// function runGame() {
//     hidden = deck.pop();
//     dealCard("dealer");
//     dealCard("player");

//     document.getElementById("hit").addEventListener("click", hit);
//     document.getElementById("stay").addEventListener("click", stay);
// }

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
        alert("You lost the game! Can't draw a new card! Please restart the game.");
        return;
    }

    dealCard("player");

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }

    document.getElementById("your-sum").innerText = yourSum;
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = `./images/cards-images/${hidden}.png`;

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
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

// let dealerSum = 0;
// let yourSum = 0;

// let dealerAceCount = 0;
// let yourAceCount = 0;

// let hidden;
// let deck;
// let canHit = true;

// window.onload = function() {
//     buildDeck();
//     shuffleDeck();
//     runGame();
// }

// function buildDeck() {
//     let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//     let types = ["C", "D", "H", "S"];
//     deck = [];
//     for (let i = 0; i < types.length; i++) {
//         for (let j = 0; j < values.length; j++) {
//             deck.push(values[j] + "-" + types[i]);
//         }
//     }
// }

// function shuffleDeck() {
//     for (let i = 0; i < deck.length; i++) {
//         let j = Math.floor(Math.random() * deck.length);
//         let temp = deck[i];
//         deck[i] = deck[j];
//         deck[j] = temp;
//     }
// }

// function runGame() {
//     hidden = deck.pop();
//     dealerSum += getValue(hidden);
//     dealerAceCount += checkAce(hidden);

//     while (reduceAce(dealerSum, dealerAceCount) < 17) {
//         dealCard("dealer");
//     }

//     for (let i = 0; i < 2; i++) {
//         dealCard("player");
//     }

//     document.getElementById("hit").addEventListener("click", hit);
//     document.getElementById("stay").addEventListener("click", stay);
// }

// function hit() {
//     if (!canHit) {
//         alert("You lost the game! Can't draw a new card! Please restart the game.");
//         return;
//     }

//     dealCard("player");

//     if (reduceAce(yourSum, yourAceCount) > 21) {
//         canHit = false;
//     }

//     document.getElementById("your-sum").innerText = yourSum;
// }

// function stay() {
//     dealerSum = reduceAce(dealerSum, dealerAceCount);
//     yourSum = reduceAce(yourSum, yourAceCount);

//     canHit = false;
//     document.getElementById("hidden").src = `./images/cards-images/${hidden}.png`;

//     let message = "";
//     if (yourSum > 21) {
//         message = "You Lose!";
//     }
//     else if (dealerSum > 21) {
//         message = "You win!";
//     }
//     //both you and dealer <= 21
//     else if (yourSum == dealerSum) {
//         message = "Tie!";
//     }
//     else if (yourSum > dealerSum) {
//         message = "You Win!";
//     }
//     else if (yourSum < dealerSum) {
//         message = "You Lose!";
//     }

//     document.getElementById("dealer-sum").innerText = dealerSum;
//     document.getElementById("your-sum").innerText = yourSum;
//     document.getElementById("results").innerText = message;
// }

// function dealCard(receiver) {
//     let cardImg = document.createElement("img");
//     let card = deck.pop();
//     cardImg.src = `./images/cards-images/${card}.png`;

//     if (receiver === "player") {
//         yourSum += getValue(card);
//         yourAceCount += checkAce(card);
//         document.getElementById("your-cards").append(cardImg);
//     } else {
//         dealerSum += getValue(card);
//         dealerAceCount += checkAce(card);
//         document.getElementById("dealer-cards").append(cardImg);
//     }
// }

// function getValue(card) {
//     let value = parseInt(card);
//     if (isNaN(value)) {
//         if (card == "A") {
//             return 11;
//         }
//         return 10;
//     }
//     return value;
// }

// function checkAce(card) {
//     return card[0] === "A" ? 1 : 0;
// }

// function reduceAce(sum, aceCount) {
//     while (sum > 21 && aceCount > 0) {
//         sum -= 10;
//         aceCount--;
//     }
//     return sum;
// }

// function resetGame() {
//     location.reload();
// }
// ------------------------
// let dealerSum = 0;
// let yourSum = 0;

// let dealerAceCount = 0;
// let yourAceCount = 0; 

// let hidden;
// let deck;

// let canHit = true;

// window.onload = function() {
//     buildDeck();
//     shuffleDeck();
//     runGame();
// }

// function buildDeck() {
//     let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//     let types = ["C", "D", "H", "S"];
//     deck = [];
//     for (let i = 0; i < types.length; i++) {
//         for (let j = 0; j < values.length; j++) {
//             deck.push(values[j] + "-" + types[i]);
//         }
//     }
// }

// function shuffleDeck() {
//     for (let i = 0; i < deck.length; i++) {
//         let j = Math.floor(Math.random() * deck.length);
//         let temp = deck[i];
//         deck[i] = deck[j];
//         deck[j] = temp;
//     }
// }

// function runGame() {
//     hidden = deck.pop();
//     dealerSum += getValue(hidden);
//     dealerAceCount += checkAce(hidden);

//     while (reduceAce(dealerSum, dealerAceCount) < 17) {
//         let cardImg = document.createElement("img");
//         let card = deck.pop();
//         cardImg.src = `./images/cards-images/${card}.png`;
//         dealerSum += getValue(card);
//         dealerAceCount += checkAce(card);
//         document.getElementById("dealer-cards").append(cardImg);
//     }

//     for (let i = 0; i < 2; i++) {
//         let cardImg = document.createElement("img");
//         let card = deck.pop();
//         cardImg.src = `./images/cards-images/${card}.png`;
//         yourSum += getValue(card);
//         yourAceCount += checkAce(card);
//         document.getElementById("your-cards").append(cardImg);
//     }

//     document.getElementById("hit").addEventListener("click", hit);
//     document.getElementById("stay").addEventListener("click", stay);

// }

// function hit() {
//     if (!canHit) {
//         return;
//     }

//     let cardImg = document.createElement("img");
//     let card = deck.pop();
//     cardImg.src = `./images/cards-images/${card}.png`;
//     yourSum += getValue(card);
//     yourAceCount += checkAce(card);
//     document.getElementById("your-cards").append(cardImg);

//     if (reduceAce(yourSum, yourAceCount) > 21) {
//         canHit = false;
//     }

//     document.getElementById("your-sum").innerText = yourSum;
// }

// function stay() {
//     dealerSum = reduceAce(dealerSum, dealerAceCount);
//     yourSum = reduceAce(yourSum, yourAceCount);

//     canHit = false;
//     document.getElementById("hidden").src = `./images/cards-images/${hidden}.png`;

//     let message = "";
//     if (yourSum > 21) {
//         message = "You Lose!";
//     }
//     else if (dealerSum > 21) {
//         message = "You win!";
//     }
//     //both you and dealer <= 21
//     else if (yourSum == dealerSum) {
//         message = "Tie!";
//     }
//     else if (yourSum > dealerSum) {
//         message = "You Win!";
//     }
//     else if (yourSum < dealerSum) {
//         message = "You Lose!";
//     }

//     document.getElementById("dealer-sum").innerText = dealerSum;
//     document.getElementById("your-sum").innerText = yourSum;
//     document.getElementById("results").innerText = message;
// }

// function getValue(card) {
//     let data = card.split("-");
//     let value = data[0];

//     if (isNaN(value)) {
//         if (value == "A") {
//             return 11;
//         }
//         return 10;
//     }
//     return parseInt(value);
// }

// function checkAce(card) {
//     if (card[0] == "A") {
//         return 1;
//     }
//     return 0;
// }

// function reduceAce(playerSum, playerAceCount) {
//     while (playerSum > 21 && playerAceCount > 0) {
//         playerSum -= 10;
//         playerAceCount -= 1;
//     }
//     return playerSum;
// }

// function resetGame() {
//     location.reload();
// }