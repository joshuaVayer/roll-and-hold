/*
Functions : 

    Core functions :

        getFace = should return a random number 
        
            EXAMPLE :
                const months = ["January", "February", "March", "April", "May", "June", "July"];
                const random = Math.floor(Math.random() * months.length);
                console.log(random, months[random]);
        
        updateFace = should define the new path to get correct dice face 

        roll = will call get face and update face -> if the face is 1 should call hold ()
*/

//--------------------------
// Variables 
//--------------------------

const faces = ['one','two','three','four','five','six'];
const path = 'public/img/faces/'
let face = 'one';
let facePath = `${path + face}.svg`;

const playerOne = document.getElementById('playerOne');
const playerTwo = document.getElementById('playerTwo');
const plrOneHand = document.getElementById('plrOneHand');
const plrTwoHand = document.getElementById('plrTwoHand');
const plrOneCumulated = document.getElementById('plrOneCumulated');
const plrTwoCumulated = document.getElementById('plrTwoCumulated');

let currentPlayer = playerOne;
let winner = (currentPlayer = playerOne) ? 'PLAYER 1' : 'PLAYER 2';

const val = (e) => parseInt(e.innerHTML);
//--------------------------
// Buttons 
//--------------------------

const newGameBtn = document.getElementById('newGameBtn');
const holdBtn = document.getElementById('holdBtn');
const rollBtn = document.getElementById('rollBtn'); 

//--------------------------
// Events listeners 
//--------------------------

newGameBtn.addEventListener('click', () => resetGame());
holdBtn.addEventListener('click', () => hold());
rollBtn.addEventListener('click', () => roll());

//--------------------------
// Functions
//--------------------------

const resetGame = () => {
    plrOneCumulated.innerHTML= '0';
    plrOneHand.innerHTML= '0';
    plrTwoCumulated.innerHTML= '0';
    plrTwoHand.innerHTML= '0';
}


const hold = () => {updateCumulates(); (val(plrOneCumulated) >= 100 || val(plrOneCumulated) >= 100) ? stopGame() : swapPlayer()};

const swapPlayer = () => {
    if (currentPlayer == playerOne) {
        playerOne.classList.remove('class','player__active');
        playerTwo.classList.add('class','player__active');
        currentPlayer = playerTwo;
    } else {
        playerOne.classList.add('class','player__active');
        playerTwo.classList.remove('class','player__active');
        currentPlayer = playerOne;
    }
}
const updateCumulates = () => {
    if (val(plrOneHand) > 0) {
        plrOneCumulated.innerHTML = val(plrOneCumulated)+val(plrOneHand);
        plrOneHand.innerHTML = 0
    }   
    if (val(plrTwoHand) > 0) {
        plrTwoCumulated.innerHTML = val(plrTwoCumulated)+val(plrTwoHand);
        plrTwoHand.innerHTML = 0
    }
}   
const stopGame = () => console.log(`The winner is ${winner}`);

