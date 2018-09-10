const buttons = document.querySelectorAll("#choice-buttons button");
buttons.forEach((button) => button.addEventListener("click", startRound));

//TODO: refactor these variables into object scope
var playerTally = 0;
var computerTally = 0;
var drawTally = 0;

function startRound(event) {
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

const resultsDisplay = document.querySelector("#results-display");

function outputResult(string) {
  let para = document.createElement("p");
  para.textContent = string;
  resultsDisplay.appendChild(para);
}