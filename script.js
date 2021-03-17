console.log("script.js loaded")

class Game{
    constructor(userOne, userTwo){
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.currentPlayer = userOne;
        this.setCurrentPlayer(userOne)
    }

    changePlayer(){
        console.log(this.currentPlayer);
        this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
        console.log(this.currentPlayer);
        document.querySelector("#currentPlayer").innerText = this.currentPlayer.marker;
    }

    setCurrentPlayer(e){
        document.querySelector("#currentPlayer").innerText = e.marker
    }

    setMarkers(x,y){
        this.userOne.marker = x;
        this.userTwo.marker = y;
    }

}

class User{
    constructor(marker){
        this.marker = marker
    }
}



let mainGame = document.querySelector('main')

const board = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"]
]

displayBoard()

let userOne = new User("X")
let userTwo = new User("O")

let newGame = new Game(userOne,userTwo)

function check(){
    if(board[0][1].innerText == board[0][0].innerText && board[0][0].innerText == board[0][2].innerText) {
        //top row
        console.log("top row")
    }else if (board[1][1].innerText == board[1][0].innerText && board[1][0].innerText == board[1][2].innerText){
        //middle row
        console.log("middle row")
    }else if (board[2][1].innerText == board[2][0].innerText && board[2][0].innerText == board[2][2].innerText){
        //bottom row
        console.log("bottom roww")
    }else if (board[0][1].innerText == board[1][1].innerText && board[0][1].innerText == board[2][1].innerText){
        //first column
        console.log("middle down")
    }else if(board[0][2].innerText == board[1][2].innerText && board[0][2].innerText == board[2][2].innerText){

        console.log("last column")
    } else if(board[0][0].innerText == board[1][1].innerText && board[0][0].innerText == board[2][2].innerText){
        console.log("middle diagnol")
    }else if(board[2][0].innerText == board[1][1].innerText && board[0][0].innerText == board[2][2].innerText){
        console.log("2nd diagnol")
    }else{

    }
}

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
                    tile.innerText = newGame.currentPlayer.marker;
                    console.log(newGame.currentPlayer.marker)
                    tile.setAttribute("style","pointer-events: none")
                    newGame.changePlayer()
                })
                board[index][innerIndex] = tile;
                mainGame.appendChild(tile);
                }
            )
        }
    )
}

