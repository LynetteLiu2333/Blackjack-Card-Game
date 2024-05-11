# Blackjack Card Game

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

This project implements a simplified version of the classic card game Blackjack. The game is played between the player and the dealer, with the objective of getting as close to 21 points as possible without exceeding it.

### Screenshot

![image](https://github.com/LynetteLiu2333/Blackjack-Card-Game/assets/90663407/8ed76838-8c6a-4381-96bb-06951b6f8e60)

### Links

- Live Site URL: [https://blackjack-card-game-u6hd.onrender.com]

### Built with

- HTML
- CSS 
- Javascript

## My process

### What I learned

1. JavaScript Basics: This project involves fundamental JavaScript concepts such as variables, functions, loops, conditional statements, and event handling.

2. DOM Manipulation: The code interacts with the Document Object Model (DOM) to dynamically update the HTML content based on game events and user interactions.

3. Algorithmic Thinking: The project requires implementing game logic, including card value calculation, handling Aces, determining winners, and managing game flow.

### Continued development

For future development, consider implementing React, we can encapsulate the game logic into reusable components. Consider refactoring the existing codebase into a React application follow these guidelines:

1. Componentize the UI: Break down the UI into components such as Player, Dealer, Card, Button, and Result. Each component will represent a specific part of the game interface, making the code more modular and easier to maintain.

2. State Management with useState(): Utilize React's useState hook to manage state variables like yourSum, dealerSum, canHit, etc. This allows for reactive updates to the UI based on changes in game state.

3. Event Handling with useEffect(): Use useEffect hook to handle side effects like dealing cards, checking game results, and updating the UI accordingly. This ensures that the UI reflects the current state of the game.

4. Conditional Rendering: Implement conditional rendering to display different UI elements based on the game state. For example, show the "Hit" and "Stay" buttons only when the player can make a move.

5. Component Lifecycle Methods: Utilize lifecycle methods like componentDidMount and componentDidUpdate to perform actions like shuffling the deck, dealing cards, and updating the game state.

6. Error Handling: Implement error boundaries to gracefully handle errors that may occur during the game execution, ensuring a smooth user experience.
