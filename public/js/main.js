//--------------------------
// 1 - Variables 
//--------------------------

const faces = ['one', 'two', 'three', 'four', 'five', 'six'];
const path = 'public/img/faces/';
let face = '';
let faceValue = 0;

const Players = [
    {
        id: 'playerOne',
        name: 'PLAYER 1',
        cumulated: 0,
        hand: 0,
        handId: 'plrOneHand',
        cumulatedId: 'plrOneCumulated'
    },
    {
        id: 'playerTwo',
        name: 'PLAYER 2',
        cumulated: 0,
        hand: 0,
        handId: 'plrTwoHand',
        cumulatedId: 'plrTwoCumulated'
    }
];

// Active player
let p = 0;

//--------------------------
// 2 - Selectors 
//--------------------------

const newGameBtn = document.getElementById('newGameBtn');
const holdBtn = document.getElementById('holdBtn');
const rollBtn = document.getElementById('rollBtn');
const winnerModal = document.getElementById('winner');
const doc = (id) => document.getElementById(id);

//--------------------------
// 3 - Events listeners 
//--------------------------

newGameBtn.addEventListener('click', () => resetGame());
holdBtn.addEventListener('click', () => hold());
rollBtn.addEventListener('click', () => roll());

//--------------------------
// 4 - Functions
// 4.1 - Functions (Roll)
//--------------------------
const roll = () => {
    getFace();
    if (faceValue === 1) {
        doc(Players[p].handId).innerHTML = '0';
        Players[p].hand = 0;
        swapPlayer();
    } else {
        updateHand();
    }
}

const getFace = () => {
    const random = Math.floor(Math.random() * faces.length);
    face = faces[random];
    faceValue = random + 1;
    doc("diceFace").src = `${path + face}.svg`;
}
const updateHand = () => {
    Players[p].hand = Players[p].hand + faceValue;
    doc(Players[p].handId).innerHTML = Players[p].hand;
    isWinner()
}
//--------------------------
// 4.2 - Functions (Hold)
//--------------------------
const hold = () => { updateCumulates(); swapPlayer() };

const updateCumulates = () => {
    Players[p].cumulated = Players[p].cumulated + Players[p].hand;
    doc(Players[p].cumulatedId).innerHTML = Players[p].cumulated;
    Players[p].hand = 0;
    doc(Players[p].handId).innerHTML = '0';
}
const swapPlayer = () => {
    doc(Players[p].id).classList.remove('class', 'player__active');
    (p === Players.length - 1) ? p = 0 : ++p;
    doc(Players[p].id).classList.add('class', 'player__active');
}
//--------------------------
// 4.3 - Functions (Others)
//--------------------------
const resetGame = () => {
    Players.forEach( player => {
        player.hand = 0;
        player.cumulated = 0;
        doc(player.cumulatedId).innerHTML = player.hand;
        doc(player.handId).innerHTML = player.cumulated;
    })
};
const isWinner = () => ( Players[p].hand + Players[p].cumulated >= 100 ) ? stopGame() : null;
const stopGame = () => { winnerModal.innerHTML = Players[p].name; $('#winnerModal').modal('show') }