//--------------------------
// 1 - Variables 
//--------------------------

const faces = ['one', 'two', 'three', 'four', 'five', 'six'];
const path = 'public/img/faces/';
let face = '';
let faceValue = 0;

const players = [
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
        doc(players[p].handId).innerHTML = '0';
        players[p].hand = 0;
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
    players[p].hand = players[p].hand + faceValue;
    doc(players[p].handId).innerHTML = players[p].hand;
    isWinner()
}
//--------------------------
// 4.2 - Functions (Hold)
//--------------------------
const hold = () => { updateCumulates(); swapPlayer() };

const updateCumulates = () => {
    players[p].cumulated = players[p].cumulated + players[p].hand;
    doc(players[p].cumulatedId).innerHTML = players[p].cumulated;
    players[p].hand = 0;
    doc(players[p].handId).innerHTML = '0';
}
const swapPlayer = () => {
    doc(players[p].id).classList.remove('class', 'player__active');
    (p === players.length - 1) ? p = 0 : ++p;
    doc(players[p].id).classList.add('class', 'player__active');
}
//--------------------------
// 4.3 - Functions (Others)
//--------------------------
const resetGame = () => {
    players.forEach( player => {
        player.hand = 0;
        player.cumulated = 0;
        doc(player.cumulatedId).innerHTML = player.hand;
        doc(player.handId).innerHTML = player.cumulated;
    })
};
const isWinner = () => ( players[p].hand + players[p].cumulated >= 100 ) ? stopGame() : null;
const stopGame = () => { winnerModal.innerHTML = players[p].name; $('#winnerModal').modal('show') }