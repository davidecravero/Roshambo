// - Game
//     - Status (start screen, play, won/lost round, won game/game over)
//     - Who is moving
//     - current round
//     - max rounds
//     - Evaluate round
//     - if same score after x rounds add additional rounds until someone won
class Game {
  constructor(name, playerOne, playerTwo, maxRounds) {
    this._name = name;
    this._playerOne = playerOne;
    this._playerTwo = playerTwo;
    this._maxRounds = maxRounds;
    this._currentRound = 1;
    this._moves = ["Rock", "Paper", "Scissors"];
  }
  newGame(){
    console.log(
      `We are starting a new game of ${this._name} with players ${this._playerOne._name} and ${this._playerTwo._name} for ${this._maxRounds} rounds.`
    );
  
    for(var i = 1; i <= this._maxRounds; i++) {

      console.log(`Playing round ${this._currentRound} of ${this._maxRounds}`);
      this._playerOne._move = this.robotMove();
      this._playerTwo._move = this.robotMove();
      console.log(this.checkWinner());
      this._currentRound++;


    }
  }
  checkWinner(){

    let moveOne = this._playerOne._move;
    let moveTwo =   this._playerTwo._move;

    if (moveOne === moveTwo) {
      playerOne._currentScore++;
      playerTwo._currentScore++;
      return "Draw";
    }

    if ((moveOne === "Rock" && moveTwo ==="Scissors") || (moveOne === "Paper" && moveTwo ==="Rock") || (moveOne === "Scissors" && moveTwo ==="Paper")) {
      playerOne._currentScore++;
       return `${playerOne._name} wins!`;
    } else {
      playerTwo._currentScore++;
      return `${playerTwo._name} wins!`;
    }






  }
  robotMove(){
    let randomNumber = Math.random();
    let choiceIndex  = Math.floor(randomNumber * this._moves.length);
    console.log((this._moves[choiceIndex]));
    return (this._moves[choiceIndex]);



  }
}

//defining class Player
class Player {
  constructor(name, stats) {
    this._name = name;
    this._stats = stats;
    this._currentScore = 0;
    this._move = "";
    console.log(`Created player ${name} with an initial score of 0.`);
  }
}
const playerOne = new Player("Human", 0);
const playerTwo = new Player("Robot", 0);

const roshambo = new Game("Roshambo", playerOne, playerTwo, 3);
roshambo.newGame();


// - Player
//     - Name
//     - roundWins
//     - roundDraws
//     - roundLosses
//     - totalWins
// - totalDraws
//     - totalLosses
//         - gamesWon
//         - gamesLost
//     - Select(), Selected Weapon (Rock, Scisscors, Paper)
//     - StrikeAPose()
//     - Play Again

// 1. Start Screen
//  - Enter Player Names
//  - Select round numbers
//  - Start Button
//  - Maybe display total scores (wins/draws/losses)

// 1. Game Screen 1
//  - Select your move (Rock, Scissor, Paper)
//  - Display Round Number x of y

// 1. Game Screen 2
//  - Bot plays his return move
//  - Small animation presents the move

// 1. Game Screen 3
//  - Winner of round is displayed
//  - Repeats to Game Screen 1 for y rounds

// 1. Final Screen
// - Winner is presented (Game Over/Won)
// - Option to continue with same players or reset (button continue, button reset)
