const NUM_GAMES = 5;

const buttons = document.querySelectorAll(".choice-buttons button");
buttons.forEach((button) => button.addEventListener("click", startRound));

//TODO: refactor these variables into object scope
var playerTally;
var computerTally;
var drawTally;
var roundOver = true;

function startRound(event) {
  if(roundOver) {
    clearResults();
    playerTally = 0;
    computerTally = 0;
    drawTally = 0;
    roundOver = false;
  }
  
  let playerSelection = event.currentTarget.id.split("-")[0];
  let computerSelection = computerPlay();
  roundResult = determineWinner(playerSelection, computerSelection);
  
  if (!roundResult) return console.error("Could not determine result of round");
  
  // this is really inelegant, but so is having a string return the result of the round.
  switch(roundResult.slice(4,8)) {
    case "Win!":
    playerTally++;
    break;
    case "Lose":
    computerTally++;
    break;
    case "Draw":
    drawTally++;
    break;
    default:
    console.error("Invalid round result");
  }
  
  outputResult(roundResult);
  outputResult(`Player: ${playerTally}, Computer: ${computerTally}, Draw: ${drawTally}`);
  
  if (playerTally >= NUM_GAMES || computerTally >= NUM_GAMES) {
    finishGame();
  }
}

function finishGame() {
  roundOver = true;
  outputResult(`GAME OVER!`);
  if (playerTally == NUM_GAMES) {
    var para = outputResult(`You win ${playerTally} to ${computerTally}`);
  } else {
    para = outputResult(`The computer wins ${computerTally} to ${playerTally}`);
  }
  let totalRounds = playerTally + computerTally + drawTally;
  para.textContent += ` after ${totalRounds} rounds`
}

function computerPlay() {
  let selection = Math.floor(Math.random()*3);
  switch (selection) {
    case 0:
    return "rock";
    case 1:
    return "paper";
    case 2:
    return "scissors";
    default:
    console.error("computerPlay() generated out of range value");
  }
}

function determineWinner(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  
  switch (playerSelection) {
    case "rock":
    switch(computerSelection) {
      case "rock":
      return "You Draw! Rock draws Rock";
      case "paper":
      return "You Lose! Paper beats Rock";
      case "scissors":
      return "You Win! Rock beats Scissors";
      default:
      console.error("Invalid computer selection");
    }
    case "paper":
    switch(computerSelection) {
      case "rock":
      return "You Win! Paper beats Rock";
      case "paper":
      return "You Draw! Paper draws Paper";
      case "scissors":
      return "You Lose! Scissors beats Paper";
      default:
      console.error("Invalid computer selection");
    }
    case "scissors":
    switch(computerSelection) {
      case "rock":
      return "You Lose! Rock beats Scissors";
      case "paper":
      return "You Win! Scissors beats Paper";
      case "scissors":
      return "You Draw! Scissors draws Scissors";
      default:
      console.error("Invalid computer selection");
    }
    default:
    console.error("Invalid player selection");
  }
}

const resultsDisplay = document.querySelector(".results-display");
const gameFrame = document.getElementsByClassName("frame")[0];
const gameFrameInitialHeight = gameFrame.offsetHeight;
gameFrame.style.height = "" + gameFrame.offsetHeight + "px";
const stretchAnimationTime = 1000 * Number.parseFloat(window.getComputedStyle(gameFrame).getPropertyValue("transition-duration")); // in ms

function outputResult(string) {
  let para = document.createElement("p");
  para.textContent = string;
  resultsDisplay.appendChild(para);
  gameFrame.style.height = "" + (Number.parseInt(gameFrame.style.height) + para.offsetHeight) + "px";
  window.setTimeout(() => { // callback to show element after frame has stretched to fit
      para.classList.toggle("show")
  }, stretchAnimationTime); 
  return para;
}
  
  function clearResults() {
    while(resultsDisplay.lastChild) {
      resultsDisplay.removeChild(resultsDisplay.lastChild);
    }
    gameFrame.style.height = "" + gameFrameInitialHeight + "px";
  }