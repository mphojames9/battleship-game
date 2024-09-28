const gamesBoardContainer = document.querySelector("#gamesboard-container");
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");
let music = new Audio("/sounds/music.mp3");
let backgroundSound = new Audio("/sounds/background_sound.mp3");
let fire_shoot = new Audio("/sounds/fire_shot.mp3");
let shot_hit = new Audio("/sounds/shot_hit.mp3");
let shot_miss = new Audio("/sounds/shot_miss.mp3");


//input section animation and style
const introElement = document.querySelector(".input-container");
const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    introElement.classList.add("fade");

    setTimeout(()=>{
        introElement.style.display = "none";
    },3000)
});


// Option choosing
let angle = 0;
function flip(){
    const optionShips = Array.from(optionContainer.children)
    angle = angle === 0 ? 90 : 0;
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`)
}
flipButton.addEventListener("click",flip); 

//Creating Boards
const width = 10;

function createBoard(color, user) {
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add("game-board")
    gameBoardContainer.style.backgroundColor = color;
    gameBoardContainer.id = user

    for (let i = 0; i < width * width; i ++){
        const block = document.createElement("div");
        block.classList.add("block");
        block.id = i;
        gameBoardContainer.append(block)
    }
    gamesBoardContainer.append(gameBoardContainer)
}
createBoard("rgba(0, 0, 0, 0.850)","player")
createBoard("rgba(0, 0, 0, 0.850","computer")

//Creationg ships
class Ship {
    constructor(name,length){
        this.name = name;
        this.length = length;
    }
}

const destroyer = new Ship("destroyer","2");
const submarine = new Ship("submarine","3");
const cruiser = new Ship("cruiser","3");
const battleship = new Ship("battleship","4");
const carrier = new Ship("carrier","5");

const ships = [destroyer, submarine, cruiser, battleship, carrier]
let notDropped

function addShipPiece(user, ship, startId) {
    const allBoardBlocks = document.querySelectorAll(`#${user} div`);
    let randomBoolen = Math.random() < 0.5
    let isHorizontal = user === 'player' ? angle === 0 : randomBoolen;
    let randomStartIndex = Math.floor(Math.random() * width * width);

    let startIndex = startId ? startId : randomStartIndex
    
    let validStar = isHorizontal ? startIndex <= width * width - ship.length ? startIndex :
        width * width - ship.length :
        // handle vertical
        startIndex <= width * width - width * ship.length ? startIndex : 
        startIndex - ship.length * width + width
    
    let shipsBlocks = []

    for (let i = 0; i < ship.length; i++){
        if(isHorizontal) {
            shipsBlocks.push(allBoardBlocks[Number(validStar) + i])
        }else{
            shipsBlocks.push(allBoardBlocks[Number(validStar) + i * width])
        }
    }

    let valid;

    if (isHorizontal) {
        shipsBlocks.every((_shipBlock, index) =>
            valid = shipsBlocks[0].id % width !== width - (shipsBlocks.length - (index + 1)))
    }else {
        shipsBlocks.every((_shipBlock, index) =>
        valid = shipsBlocks[0].id < 90 + (width * index +1)
        )
    }

    const notTaken = shipsBlocks.every(shipBlock => !shipBlock.classList.contains("taken"))
    

    if(valid && notTaken) {
    shipsBlocks.forEach(shipBlock => {
        shipBlock.classList.add(ship.name)
        shipBlock.classList.add("taken")
    })
    }  
     else {
       if (user === "computer"){
        addShipPiece(ship)
       } 
        if (user === "player"){
            notDropped = true
        } 
    }
}
ships.forEach(ship => addShipPiece('computer',ship))

//Drag player ships
let draggedShip
const optionShips = Array.from(optionContainer.children)
optionShips.forEach(optionShip => optionShip.addEventListener("dragstart",dragStart))

const allPlayerBlocks = document.querySelectorAll("#player div")
allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener("dragover", dragOver);
    playerBlock.addEventListener("drop",dropShip)
})

function dragStart(e){
    notDropped = false;
    draggedShip = e.target;
}

function dragOver(e){
    e.preventDefault()
}

function dropShip(e) {
    const startId = e.target.id;
    const ship = ships[draggedShip.id];
    addShipPiece('player', ship, startId)

    const outStandingShips = optionContainer.children.length-1
    if (outStandingShips === 0) {
        setTimeout(startGame,100)
    }
    if (!notDropped) {
        draggedShip.remove()
    }
}

//START GAME
const startButton = document.querySelector("#start-button");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");
const computerBlocks = document.querySelector("#computer");
const gameContainer = document.querySelector(".game-container")
const shipHolder = document.querySelector(".option-container");

let gameOver = false;
let playerTurn


function startGame() {
        if (optionContainer.children.length != 0){
            return
        } else {
            allBoardBlocks = document.querySelectorAll("#computer div")
            allBoardBlocks.forEach(block => block.addEventListener("click", handleClick))
            fadeAnimation()
        }
        playerTurn = true
        turnDisplay.textContent = "Your Turn!"
        infoDisplay.textContent = "The game has Started"
    }


let playerHits = []
let compuetrHits = []
const playerSunkShips = []
const computerSunkShips = []


function handleClick(e) {
    if (!gameOver) {
        if (e.target.classList.contains("taken")) {
            e.target.classList.add("boom")
            infoDisplay.textContent = "You hit the computer's ship";
            let classes = Array.from(e.target.classList)
            classes = classes.filter(className => className !== "block")
            classes = classes.filter(className => className !== "boom")
            classes = classes.filter(className => className !== "taken")
            playerHits.push(...classes)
            checkScore("player", playerHits, playerSunkShips)
        }
        if (!e.target.classList.contains("taken")) {
            infoDisplay.textContent = "You Missed"
            e.target.classList.add("empty")
        }
        playerTurn = false;
        const allBoardBlocks = document.querySelectorAll("#computer div")
        allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
        setTimeout(computerGo, 3000)
    }
}

function computerGo(){
    if (!gameOver) {
        turnDisplay.textContent = "Computer's Turn";
        infoDisplay.textContent = "The Computer Is Arming..."
    }

    setTimeout(() => {
        let randomGo = Math.floor(Math.random() * width * width)
        const allBoardBlocks = document.querySelectorAll("#player div")

        if (allBoardBlocks[randomGo].classList.contains("taken") &&
        allBoardBlocks[randomGo].classList.contains("boom")
    ) {
            computerGo()
            return
        }else if (
            allBoardBlocks[randomGo].classList.contains("taken") &&
            !allBoardBlocks[randomGo].classList.contains("boom")
        ) {
            allBoardBlocks[randomGo].classList.add("boom")
            infoDisplay.textContent = "The Computer Hits Your Ship"
            let classes = Array.from(allBoardBlocks[randomGo].classList)
            classes = classes.filter(className => className !== "block")
            classes = classes.filter(className => className !== "boom")
            classes = classes.filter(className => className !== "taken")
            compuetrHits.push(...classes)
            checkScore("computer", compuetrHits, computerSunkShips)
        } else {
            infoDisplay.textContent = "Cuputer Missed"
            allBoardBlocks[randomGo].classList.add("empty")
        }
    }, 2000)

    setTimeout(() => {
        playerTurn = true
        turnDisplay.textContent = "Your Turn!"
        infoDisplay.textContent = "Shoot!!!"
        const allBoardBlocks = document.querySelectorAll("#computer div")
        allBoardBlocks.forEach(block => block.addEventListener("click", handleClick))
    }, 2000);
}

function checkScore(user, userHits, userSunkShips) {

    function checkShip(shipName, shipLength) {
        if (
            userHits.filter(storedShipName => storedShipName === shipName).length === shipLength
        )   {

            if(user === "player") {
                infoDisplay.textContent = `You sunk the computer's ${shipName}`
                playerHits = userHits.filter(storedShipName => storedShipName !== shipName)
            }

            if(user === "computer") {
                infoDisplay.textContent = `Computer sunk your ${shipName}`
                compuetrHits = userHits.filter(storedShipName => storedShipName !== shipName)
            }
            userSunkShips.push(shipName)
        }
    }
    checkShip("destroyer",2)
    checkShip("submarine", 3)
    checkShip("cruiser", 3)
    checkShip("battleship", 4)
    checkShip("carrier", 5)

    console.log('playerHits',playerHits)
    console.log('playerSunkShips', playerSunkShips)

    if(playerSunkShips.length === 5) {
        infoDisplay.textContent = "you sunk all the computers ships . You won"
    }
    if(computerSunkShips.length === 5){
        infoDisplay.textContent = "Computer sunk all you ships you, lost the game"
    }

}

function fadeAnimation(){
    setTimeout(()=>{
        gameContainer.classList.add("fade")
        music.play()
    },100)

    setTimeout(()=>{
        gameContainer.classList.add("fadeIn")
        computerBlocks.style.display = "flex";
        flipButton.style.display = "none";
        shipHolder.style.display = "none";
    },2000)
}