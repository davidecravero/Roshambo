let UIPlayer1name = '';
let UIPlayer2name = '';
let UIMaxRounds = '';
let GameLink='';

let initializeInput = (inputId) => {
	//$(inputId).val('');
	$(inputId).focus();
	$(inputId).on('keyup', (evt) => {
		var code = (evt.keyCode ? evt.keyCode : evt.which);
		if (code === 13) {
			evt.preventDefault();
			nextScreen($(evt.target));
		}
    });
}


let getSlideId = (o) => {
	return o.prop("id")
}

let markField = (id) => {
	let oldBG=$(id).css( "border-color" );
	let newBG="#F00";
	$(id).css("border-color", newBG);
	setTimeout(() => {resetColor(id,oldBG);}, 1000);
	
}

let resetColor = (id, oldBG) => {
	$(id).css("border-color", oldBG);
}

let isValidInput = (id) => {
	let inputValue = $(id).val();
	let res = inputValue.trim() !== ''
	if (!res) markField(id);
	return (res);
}

let nextScreen = (element) => {
	let currentSlide=element.parents('.roshambo-start-slide');
	let nextSlide=element.parents('.roshambo-start-slide').next();
	console.log("You're on current slide "+getSlideId(currentSlide))
	switch (getSlideId(currentSlide)){
		case 'start':
			currentSlide.hide();
			nextSlide.addClass('animate-in');
			break;
		case 'choose-rounds':
			UIMaxRounds=element.data('rounds');
			console.log (`${UIMaxRounds} rounds.`);
			currentSlide.hide();
			nextSlide.addClass('animate-in');
			initializeInput('#player-1-name');
			break;
		case 'choose-player-1-name':
			if(isValidInput('#player-1-name')){
				UIPlayer1name=$('#player-1-name').val().trim();
				console.log (`Player 1: ${UIPlayer1name}`);
				currentSlide.hide();
				nextSlide.addClass('animate-in');
				initializeInput('#player-2-name');
			}		
			break;
		case 'choose-player-2-name':
			if(isValidInput('#player-2-name')){
				UIPlayer2name=$('#player-2-name').val().trim();
				console.log (`Player 2: ${UIPlayer2name}`);
				startGame(UIPlayer1name, UIPlayer2name, UIMaxRounds);
			}		
			break;
		default:
			break;	
	}

}
    
let startGame = (name1, name2, rounds) => {
	console.log("started game");
	
	console.log (`Game started: ${name1} vs ${name2} for ${rounds} rounds.`);
	GameLink=initializeGame(name1,name2,"Roshambo",rounds);
	$('body').addClass('roshambo-running');
	
	$('#player-1-name-field').html(name1);
	$('#player-2-name-field').html(name2);
	$('#max-rounds').html(rounds);
	
}


let showMove = (playerClass, choice) => {
	choice=choice.toLowerCase();
	$(`.${playerClass}-choice-icon i`).hide();
	// merges to e.g. player-1-choice-icon i.rock
	$(`.${playerClass}-choice-icon i.${choice}`).show();
	console.log(`.${playerClass}-choice-icon i.${choice}`);

}

let makeMove = (element) => {
	let winMessage;
	let player1Move;
	let player2Move;
	
	$('body').addClass('roshambo-choice-made');
	player1Move=element.data('choice');
	console.log (`Move clicked: ${player1Move}.`);
	showMove("player-1", player1Move);
	
	player2Move=GameLink.robotMove();
	showMove("player-2", player2Move);
	/* communicate with Game Class */
	GameLink._playerOne._move=player1Move;
	GameLink._playerTwo._move=player2Move;
	let checkWin=GameLink.checkWinner(); // returns an object now (.output/.result)
	switch (checkWin.winner){
		case 1:	
			winMessage="Human wins!"; break;
		case 2:	
			winMessage="Robot wins!"; break;
		default:	
			winMessage="It's a draw!";
	}
	$(".round-result-winner").html(winMessage);
	
	GameLink._currentRound++;
	if (GameLink._currentRound<=GameLink._maxRounds){
		$(".button-next-round").html("Next!");	
	}else{
		$(".button-next-round").html("Finish!");
	}

	// wait for UI animation
	setTimeout(() => {showResult(GameLink._playerOne._currentScore, GameLink._playerTwo._currentScore);},3000);
}

let showResult = (score1, score2) => {
	$(".player-1-score").html(score1);
	$(".player-2-score").html(score2);
}

let nextRound = () => {
	console.log("Clicked next round!")
	$('body').removeClass('roshambo-choice-made');
	$('#current-round').html(GameLink._currentRound);
}

let endGame = () => {
	let player1name=GameLink._playerOne._name;
	let player2name=GameLink._playerTwo._name;
	let player1score=GameLink._playerOne._currentScore;
	let player2score=GameLink._playerTwo._currentScore;
	let overallWinner=0;
		
	console.log("Game ended!");
	overallWinner=GameLink.finalResults();
	//$('body').removeClass('roshambo-running');
	$('body').removeClass('roshambo-choice-made');
	$('body').addClass('end-game');
	console.log("added class end-game!");
	
	switch (overallWinner){
		case 1:	
			winMessage=`${player1name} won the game!`;
			finalClass='player-1-wins';
			break;
		case 2:	
			winMessage=`{player2name} won the game!`; 
			finalClass='player-2-wins';
			break;
			
		default:	
			winMessage="It's a draw!";
			finalClass='draw';
	}
	$("#game-result-winner").html(winMessage);
	
}



let initialize = () => {
	console.log ('Game UI initialized.');
	//document.querySelector('.start button').addEventListener('click',startClick);
	$('.go-next').on('click', (evt) => {
		evt.preventDefault();
        nextScreen($(evt.target));
    });
	$('.roshambo-start-slide .button-ok').on('click', (evt) => {
		evt.preventDefault();
        nextScreen($(evt.target));
    });	
	$('.roshambo-choice li').on('click', (evt) => {
		evt.preventDefault();
        makeMove($(evt.currentTarget)); //currentTarget always delivers li, not the inner parts of the button
    });
	$('.button-next-round').on('click', (evt) => {
		evt.preventDefault();
		if(GameLink._currentRound<=GameLink._maxRounds){
			nextRound($(evt.currentTarget)); 	
		}else{
			endGame($(evt.currentTarget));
		}
        
    });
	$('.button-restart').on('click', (evt) => {
		evt.preventDefault();
		location.reload();
        
    });


}

//Jquery Variant for document.addEventListener('DOMContentLoaded', initialize);
$(document).ready(initialize());


