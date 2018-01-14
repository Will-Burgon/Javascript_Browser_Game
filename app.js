/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Create Variables to keep track of my most important info for game. Global scores, round score, which player is active.

var scores, roundScores, activePlayer, gamePlaying;

init();



//document.querySelector("#current-0").textContent = dice;

//document.querySelector("#current-" + activePlayer).textContent = dice;  
//The difference between the two methods is that its more dynamic. By concatenating the activePlayer we don't need to write 0 or 1 to access the correct player in the HTML code. activePlayer is set to 0 anyway. Javascript coerces the type and #current- becomes #current-0.

//document.querySelector("#current-" + activePlayer).innerHTML = "<strong>" + dice + "</strong>" //By using innerHTML instead of textContent we have to use HTML tags to change the appearance.



//Rolling the dice.

var diceRoll = document.querySelector(".btn-roll");

diceRoll.addEventListener('click', function () {
    if (gamePlaying) {
        //Random Number

        var dice = Math.floor(Math.random() * 6) + 1; // Where floor removes the decimal place and random generates a random number between 0 and 1. Multiply it by 6 to give a number between 0 and 5 and then add 1 to ensure that the result will be between 1 and 6.
        console.log(dice)
      




        //Display Correct Image

        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';


        document.getElementById('dice1').src = 'dice-' + dice + '.png' //A shortcut to make the process dynamic. By naming each dice image 1,2,3 etc we can combine the Math method for the dice variable with changing the src attribute.
      


        //Add to score IF dice roll is not 1

        if (dice !== 1) {

            //add score
            roundScore += dice; //same as roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {


            //Next Player
            nextPlayer();


        }

    }



});

//Hold Button to transfer score to Global

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) { //add current score to global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        //Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.getElementById('dice1').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }


});

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('dice1').style.display = 'none';

    //style method is used for changing the CSS. Then add the css property preceeded by a .

    //Set all the player scores and current scores to 0

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    //State Variable - Describes the state of 
    gamePlaying = true;
}



function nextPlayer() {

    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator. Works like an if statement but can do it on one line. Set the condition first then place a ? before the code to be executed. The : works as the else in an if statement.

    document.querySelector('.player-0-panel').classList.toggle('active');

    document.querySelector('.player-1-panel').classList.toggle('active');


    document.getElementById('dice1').style.display = 'none';





}

document.querySelector('.btn-new').addEventListener('click', init);
