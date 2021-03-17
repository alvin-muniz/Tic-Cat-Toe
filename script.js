console.log("script.js loaded")

class Game{
    constructor(userOne, userTwo){
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.setCurrentPlayer(userOne)
        this.gameCounter = 1;
        this.board = [
            ["1","2","3"],
            ["4","5","6"],
            ["7","8","9"]
        ]
    }

    startNewGame(){
        this.createBoard()
    }

    changePlayer(){
        console.log(this.currentPlayer);
        if(this.currentPlayer == this.userTwo)
        { console.log(this.gameCounter++)}
        this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
        console.log(this.currentPlayer);
        this.checkWinner()
        document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;

    }

    setCurrentPlayer(e){
        this.currentPlayer = e
        document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;
    }

    setMarkers(x,y){
        this.userOne.marker = x;
        this.userTwo.marker = y;
    }

    createBoard(){
        let mainGame = document.querySelector('main')
        this.board.forEach(
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
                        this.board[index][innerIndex] = tile;
                        mainGame.appendChild(tile);
                    }
                )
            }
        )
    }//end create board

    clearBoard(){
        this.board.forEach((e, index) =>{
            e.forEach((x, innerIndex) => {
                x.innerText = index + "" + innerIndex;
            })
        })
    }

    checkWinner(){
        if(this.board[0][1].innerText == this.board[0][0].innerText && this.board[0][0].innerText == this.board[0][2].innerText) {
            console.log("top row")
            this.clearBoard()
            return true;
        }else if (this.board[1][1].innerText == this.board[1][0].innerText && this.board[1][0].innerText == this.board[1][2].innerText){
            console.log("middle row")
            return true;
        }else if (this.board[2][1].innerText == this.board[2][0].innerText && this.board[2][0].innerText == this.board[2][2].innerText){
            console.log("bottom row")
            return true;
        }else if (this.board[0][1].innerText == this.board[1][1].innerText && this.board[0][1].innerText == this.board[2][1].innerText){
            console.log("middle down")
            return true;
        }else if(this.board[0][2].innerText == this.board[1][2].innerText && this.board[0][2].innerText == this.board[2][2].innerText){
            console.log("last column")
            return true;
        } else if(this.board[0][0].innerText == this.board[1][1].innerText && this.board[0][0].innerText == this.board[2][2].innerText){
            console.log("middle diagnol")
            return true;
        }else if(this.board[2][0].innerText == this.board[1][1].innerText && this.board[0][0].innerText == this.board[2][2].innerText){
            console.log("2nd diagnol")
            return true;
        }else{
            return false;
        }
    }//end check

}

class User{
    constructor(name, marker){
        this.marker = marker;
        this.name = name;
    }
}



let userOne = new User("Cat","X")
let userTwo = new User("Dog","O")

let newGame = new Game(userOne,userTwo)

newGame.createBoard()


// function input(x,y){
//     console.log(this.board[x][y])
//     this.board[x][y] = "X"
//     document.querySelector(`.location-${x}${y}`).innerText = 'X'
// }


