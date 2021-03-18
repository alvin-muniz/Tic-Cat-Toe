console.log("script.js loaded")

class Game {
    constructor(userOne, userTwo) {
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.setCurrentPlayer(userOne)
        this.gameCounter = 1;

    }

    startNewGame() {
        this.createBoard()
    }

    changePlayer(winCondition) {
        this.gameCounter++

        if (winCondition) {
            document.querySelector("h4").innerText = `Winner is ${this.currentPlayer.name}`
            document.querySelector(".winModal").setAttribute("style","display: flex")
            document.querySelector("#resetGame").addEventListener('click',(e)=>{
                e.preventDefault()
                console.log("reset button clicked")
                document.querySelector(".winModal").setAttribute("style","display: none")
                this.resetGame()
            })
        }
         else if (this.gameCounter == 10) {
            document.querySelector("h4").innerText = `It's a cat's game, meow`
            this.resetGame()
        }
        else {
            this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
            document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;
        }//else
    }

    setCurrentPlayer(e) {
        this.currentPlayer = e
        document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;
    }

    setMarkers(x, y) {
        this.userOne.marker = x;
        this.userTwo.marker = y;
    }

    createBoard() {
        let mainGame = document.querySelector('main')
        this.board = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"]
        ]
        this.board.forEach(
            (e, index) => {
                e.forEach((x, innerIndex) => {
                        let tile = document.createElement("div");
                        this.setTile(tile, index, innerIndex)
                        mainGame.appendChild(tile);
                    }
                )//inner for each loop
            }
        )//outer for each loop
    }//end create board

    setTile(tile, x, y) {
        tile.classList.add("tile", "location-" + `${x}${y}`);
        tile.innerText = x + "" + y;
        tile.addEventListener('click', (e) => {
            tile.innerText = this.currentPlayer.marker;
            tile.setAttribute("style", "pointer-events: none")
            this.changePlayer(this.checkWinner())
        })//event listener
        this.board[x][y] = tile;
    }


    resetGame() {
        this.board.forEach((e, index) => {
            e.forEach((x, innerIndex) => {
                x.innerText = index + "" + innerIndex;
                x.setAttribute("style", "pointer-events: auto")
            })
        })
        this.gameCounter = 0;
    }

    checkWinner() {
        let winCondition = false
        let set = [
            [this.board[0][1].innerText, this.board[0][0].innerText, this.board[0][2].innerText],
            [this.board[1][1].innerText, this.board[1][0].innerText, this.board[1][2].innerText],
            [this.board[2][1].innerText, this.board[2][0].innerText, this.board[2][2].innerText],
            [this.board[0][1].innerText, this.board[1][1].innerText, this.board[2][1].innerText],
            [this.board[0][2].innerText, this.board[1][2].innerText, this.board[2][2].innerText],
            [this.board[0][0].innerText, this.board[1][1].innerText, this.board[2][2].innerText],
            [this.board[2][0].innerText, this.board[1][1].innerText, this.board[2][2].innerText],
            [this.board[0][0].innerText, this.board[1][0].innerText, this.board[2][0].innerText]
        ]

        set.forEach((e, index) => {
            let player = [this.currentPlayer.marker, this.currentPlayer.marker, this.currentPlayer.marker].toString()
            if (e.toString() === player) {
                // this.resetGame()
                winCondition = true;
            }
        })
        return winCondition
    }//end check
}

class User {
    constructor(name, marker) {
        this.marker = marker;
        this.name = name;
    }
}

let userOne = new User("Cat", "X")
let userTwo = new User("Dog", "O")
let newGame = new Game(userOne, userTwo)
newGame.startNewGame()
