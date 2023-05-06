const playBtn = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const match = document.querySelector('.match');

playBtn.addEventListener('click', () => {
  introScreen.classList.add('unactive');
  match.classList.add('active');
  game();
});

let playerScore = 0;
let computerScore = 0;

function game() {
  function updateScore() {
    document.querySelector('.player-score p').textContent = playerScore;
    document.querySelector('.computer-score p').textContent = computerScore;
  }

  function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
      const winner = document.querySelector('.winner');
      if (playerScore === 5) {
        winner.textContent = 'You are the winner!';
      } else {
        winner.textContent = 'Computer is the winner!';
      }
      return true;
    }
    return false;
  }

  function playMatch() {
    const choices = document.querySelectorAll('.choices button');
    const computerOptions = ['rock', 'paper', 'scissors'];
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');

    choices.forEach((choice) => {
      choice.addEventListener('click', function () {
        if (checkWinner()) return;

        const computerNumber = Math.floor(Math.random() * 3);
        const computerSelection = computerOptions[computerNumber];

        const roundResult = playRound(this.textContent, computerSelection);

        if (roundResult === 'win') {
          playerScore++;
        } else if (roundResult === 'lose') {
          computerScore++;
        }

        updateScore();

        playerHand.src = `./images/${this.textContent}.png`;
        computerHand.src = `./images/${computerSelection}.png`;

        checkWinner();
      });
    });
  }

  playMatch();
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 'tie';
  }
  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
}
