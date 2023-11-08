import { randomWordGenerator } from "./words.js";

const buttonsContainer = document.querySelector(".buttons-container");
const guessContainer = document.querySelector(".word-container");
const strikeImage = document.querySelector(".strike-image");
const restartButton = document.querySelector(".restart-button");
const wordToGuess = randomWordGenerator();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lettersPressed = new Set();
let strikeCount = 0;

Array.from(wordToGuess).forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = "_";
  span.classList.add("display-letter", letter);
  guessContainer.appendChild(span);
});

alphabet.forEach((letter) => {
  buttonsContainer.innerHTML += `<button class='letter-button'>${letter}</button>`;
});

const letterButtons = document.querySelectorAll(".letter-button");

letterButtons.forEach((buttonElement) => {
  buttonElement.addEventListener("click", (event) => {
    const button = event.target.textContent;

    if (!lettersPressed.has(button)) {
      lettersPressed.add(button);
      buttonElement.disabled = true;
    }

    Array.from(wordToGuess).forEach((letter, index) => {
      if (button.toLowerCase() === letter.toLowerCase()) {
        const emptySpan = guessContainer.querySelector(`.${letter}`);
        emptySpan.textContent = button;
        emptySpan.classList.remove(letter);
        emptySpan.classList.add("correct");
      }
    });

    if (!wordToGuess.toLowerCase().includes(button.toLowerCase())) {
      strikeCount++;
      strikeImage.src = `/images/hangmanStrike${strikeCount}.png`;
    }

    const endScreen = () => {
      document.querySelector(".end-screen").style.visibility = "visible";
      document.querySelector(
        ".game-result"
      ).innerHTML = `<div class="end-info">${
        strikeCount === 6 ? "Failure" : "Success"
      }!</div>
    ${
      strikeCount === 6
        ? `<div class="end-info">Your word was: ${wordToGuess.toUpperCase()}</div>`
        : ""
    }
    <button onClick="window.location.reload()" class="letter-button restart-button">Restart</button>`;
    };

    const correct = document.querySelectorAll(".correct").length;

    if (strikeCount === 6 || correct === wordToGuess.length) {
      endScreen();
    }
  });
});
