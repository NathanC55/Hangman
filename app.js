import { words, randomWordGenerator } from "./words.js";
const buttonsContainer = document.querySelector(".buttons-container");
const guessContainer = document.querySelector(".word-container");
const strikeImege = document.querySelector(".strike-imege");
//generate random word
const wordToGuess = randomWordGenerator();
//with an array of alphabet, map over and generate buttons for each letter
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let lettersPressed = [];
let strikeCount = 0;

//map over generated word.length and return an underscore for each one

Array.from(wordToGuess).forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = "_";
  span.classList.add("display-letter");

  span.classList.add(letter);
  guessContainer.appendChild(span);
});

alphabet.forEach(function (letter) {
  buttonsContainer.innerHTML += `<button class='letter-button'>${letter.toUpperCase()}</button>`;
});

const letterButtons = document.querySelectorAll(".letter-button");

//store pressed buttons in a state variable that is an array
//based on array of pressed buttons, going to disable buttons
letterButtons.forEach((buttonElement) => {
  buttonElement.addEventListener("click", (event) => {
    const button = event.target.textContent;

    if (!lettersPressed.includes(button)) {
      lettersPressed.push(button);
      buttonElement.disabled = true;
    }
    //if letter exist in pressed button array, display actual letter
    Array.from(wordToGuess).forEach((letter) => {
      if (button.toLowerCase() === letter.toLowerCase()) {
        const span = document.querySelector(`.${button.toLowerCase()}`);
        span.textContent = button;
        span.classList.remove(button.toLowerCase());
        span.classList.add("correct");
      }
    });

    //display a stike for each missed letter
    if (!wordToGuess.toLowerCase().includes(button.toLowerCase())) {
      strikeCount++;
      strikeImege.src = `imges/hangmanStrike${strikeCount}.jpg`;
    }
    if (strikeCount === 6) {
      document.querySelector(".end-screen").style.zIndex = 100;
      document.querySelector(".game-result").innerHTML = "You Lose";
    }

    if (document.querySelectorAll(".correct").length === wordToGuess.length) {
      document.querySelector(".game-screen").style.zIndex = 100;
      document.querySelector(".game-result").innerHTML = "You Win!!";
    }
  });
});

// reduce function over pressed buttons array, using .some to see if letter is contained in random word
