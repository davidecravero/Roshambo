//define class Game
class Game {
  constructor(name, playerOne, playerTwo, maxRounds) {
    this._name = name;
    this._playerOne = playerOne;
    this._playerTwo = playerTwo;
    this._maxRounds = maxRounds;
    this._currentRound = 1;
    this._moves = ["Rock", "Paper", "Scissors"];
    this._shortCode = ["R","P","S"];
  }

  //setting up a new game
  newGame(){
    console.log(
      `We are starting a new game of ${this._name} with players ${this._playerOne._name} and ${this._playerTwo._name} for ${this._maxRounds} rounds.`
    );

    for(var i = 1; i <= this._maxRounds; i++) {

      console.log(`Playing round ${this._currentRound} of ${this._maxRounds}`);
      this._playerOne._move = this.humanMove();
      this._playerTwo._move = this.robotMove();
      console.log(this.checkWinner());
      this._currentRound++;
    }
    this.finalResults();
  }

  //final results of the game
  finalResults(){
    let playerOneWon = this._playerOne._currentScore;
    let playerTwoWon = this._playerTwo._currentScore;
    let finalResults = `${this._playerOne._name} ${playerOneWon} : ${this._playerTwo._name} ${playerTwoWon}`;
    console.log(finalResults);
    if(playerOneWon > playerTwoWon) {
      console.log(`Congratulations ${this._playerOne._name} won!`);
	  return 1;
    } else if(playerOneWon < playerTwoWon) {
      console.log(`Congratulations ${this._playerTwo._name} won!`)
	  return 2;
    } else {
      console.log("It's a draw!");
	  return 0;
    }
  }

//checking game's winner
  checkWinner(){
    let moveOne = this._playerOne._move.toLowerCase();
    let moveTwo =   this._playerTwo._move.toLowerCase();
	  
    if (moveOne === moveTwo) {
      playerOne._currentScore++;
      playerTwo._currentScore++;
      return {output:"Draw",winner:0};
    }
    //game logic - define choices

    if ((moveOne === "rock" && moveTwo ==="scissors") || (moveOne === "paper" && moveTwo ==="rock") || (moveOne === "scissors" && moveTwo ==="paper")) {
      playerOne._currentScore++;
       return {output:`${playerOne._name} wins!`,winner:1};
    } else {
      playerTwo._currentScore++;
      return {output:`${playerTwo._name} wins!`, winner:2};
    }
}

//getting random moves from a computer
robotMove(){
    let randomNumber = Math.random();
    let choiceIndex  = Math.floor(randomNumber * this._moves.length);
    console.log((this._moves[choiceIndex]));
    return (this._moves[choiceIndex]);
 }
 humanMove(){
   let rock = "R";
   let scissors = "S";
   let paper = "P";
   let humanInput;

      do {
        humanInput = prompt(`Choose between rock, paper or scissors!
           Write ${rock} for rock, ${scissors} for scissors, and ${paper} for paper.`);
           humanInput = humanInput.toUpperCase();
      }
      while(!(this._shortCode.includes(humanInput)));
      // while(humanInput !== rock && humanInput !== scissors && humanInput !== paper);
        console.log(this._moves[this._shortCode.indexOf(humanInput)]); // translate from [R, P, S] to  [Rock, Scissors, Paper]

        return(this._moves[this._shortCode.indexOf(humanInput)]); // translate from [R, P, S] to  [Rock, Scissors, Paper]

 }
}

//defining class Player
class Player {
  constructor(name) {
    this._name = name;
    this._currentScore = 0;
    this._move = "";
    console.log(`Created player ${name} with an initial score of 0.`);
  }
}
//creating two Player(s) (objects) and Game(object)

let playerOne;
let playerTwo;
let roshambo;

let initializeGame = (name1, name2, gameName, maxRounds)=>{
	console.log("init in Game Class")
	playerOne = new Player(name1, 0);
	playerTwo = new Player(name2, 0);
	roshambo = new Game(gameName, playerOne, playerTwo, maxRounds);
	return roshambo;
}
//roshambo.newGame();
