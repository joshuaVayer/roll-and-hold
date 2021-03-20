//--------------------------
// Variables 
//--------------------------

const faces = ['one', 'two', 'three', 'four', 'five', 'six'];
const path = 'public/img/faces/';
let face = '';
let faceValue = 0;

const playerOne = document.getElementById('playerOne');
const playerTwo = document.getElementById('playerTwo');
const plrOneHand = document.getElementById('plrOneHand');
const plrTwoHand = document.getElementById('plrTwoHand');
const plrOneCumulated = document.getElementById('plrOneCumulated');
const plrTwoCumulated = document.getElementById('plrTwoCumulated');
const winnerModal = document.getElementById('winner');

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
    plrOneCumulated.innerHTML = '0';
    plrOneHand.innerHTML = '0';
    plrTwoCumulated.innerHTML = '0';
    plrTwoHand.innerHTML = '0';
}


const roll = () => {
    getFace();
    if (faceValue === 1) {
        plrOneHand.innerHTML = '0'; plrTwoHand.innerHTML = '0';
        swapPlayer();
    } else {
        updateHands();
    }
}

const getFace = () => {
    const random = Math.floor(Math.random() * faces.length);
    face = faces[random];
    faceValue = random + 1;
    document.getElementById("diceFace").src = `${path + face}.svg`;
}
const updateHands = () => {
    if (currentPlayer == playerOne) {
        plrOneHand.innerHTML = val(plrOneHand) + faceValue;
    } else {
        plrTwoHand.innerHTML = val(plrTwoHand) + faceValue;
    }
    isWinner()
}
const isWinner = () => (val(plrOneHand) + val(plrOneCumulated) >= 100 || val(plrTwoHand) + val(plrTwoCumulated) >= 100) ? stopGame() : null;


const hold = () => { updateCumulates(); swapPlayer() };

const swapPlayer = () => {
    if (currentPlayer == playerOne) {
        playerOne.classList.remove('class', 'player__active');
        playerTwo.classList.add('class', 'player__active');
        currentPlayer = playerTwo;
    } else {
        playerOne.classList.add('class', 'player__active');
        playerTwo.classList.remove('class', 'player__active');
        currentPlayer = playerOne;
    }
}
const updateCumulates = () => {
    if (val(plrOneHand) > 0) {
        plrOneCumulated.innerHTML = val(plrOneCumulated) + val(plrOneHand);
        plrOneHand.innerHTML = 0;
    }
    if (val(plrTwoHand) > 0) {
        plrTwoCumulated.innerHTML = val(plrTwoCumulated) + val(plrTwoHand);
        plrTwoHand.innerHTML = 0;
    }
}
const stopGame = () => {
    winnerModal.innerHTML = winner;
    $('#winnerModal').modal('show')
}