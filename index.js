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
    this._playerOne = playerOne._name;
    this._playerTwo = playerTwo._name;
    this._maxRounds = maxRounds;
    this._currentRound = 1;
  }
}
class Player {
  constructor(name, stats) {
    this._name = name;
    this._stats = stats;
    this._currentScore = 0;
    console.log(`Created player ${name} with an initial score of 0.`);
  }
}
const playerOne = new Player("Human", 0);
const playerTwo = new Player("Robot", 0);

const roshambo = new Game("Roshambo", playerOne, playerTwo, 3);
console.log(roshambo);
console.log(
  `We are starting a new game of ${roshambo._name} with players ${roshambo._playerOne} and ${roshambo._playerTwo} for ${roshambo._maxRounds} rounds.`
);

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
