buttons = document.querySelectorAll("#choice-buttons button");
console.log(buttons);

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

function playRound(playerSelection, computerSelection) {
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