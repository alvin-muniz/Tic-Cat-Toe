console.log("script.js loaded")

class Game{
    constructor(userOne, userTwo){
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.currentPlayer = userOne;
    }

    changePlayer(){
        console.log(this.currentPlayer);
        this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
        console.log(this.currentPlayer);
    }

}


let mainGame = document.querySelector('main')

const board = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"]
]

displayBoard()

let newGame = new Game("playerOne","playerTwo")

function input(x,y){
    console.log(board[x][y])
    board[x][y] = "X"
    document.querySelector(`.location-${x}${y}`).innerText = 'X'
}

function displayBoard(){
    board.forEach(
        (e, index) => {
            e.forEach((x,innerIndex) =>{
                let tile = document.createElement("div");
                tile.classList.add("tile","location-"+`${index}${innerIndex}`);
                tile.innerText = index + "" + innerIndex;
                tile.addEventListener('click',()=>{
                    tile.innerText = "X";
                })
                board[index][innerIndex] = tile;
                mainGame.appendChild(tile);
                }
            )
        }
    )
}

class User{
    constructor(marker){
        this.marker = marker
    }
}
