console.log("script.js loaded")

class Session {
    static totalGamesPlayed = [];
}

class Game {
    constructor(userOne, userTwo, draws = 0) {
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.setCurrentPlayer(userOne)
        this.gameCounter = 1;
        this.draws = draws

        this.startNewGame()
    }

    startNewGame() {
        if (this.gameCounter !== 1) {
            this.gameCounter = 1;
        }
        let nodes = document.querySelectorAll(".tile")
        nodes.forEach((e, index) => {
            e.remove()
        });
        this.createBoard()
    }

    changePlayer(winCondition) {
        this.gameCounter++
        if (winCondition) {
            document.querySelector(".winModal").setAttribute("style", "display: flex")
            document.querySelector(".winModal h4").innerText = `Winner is ${this.currentPlayer.name}`
            this.currentPlayer.wins++
            this.setScore()
        } else if (this.gameCounter == 10) {
            if(!this.draws)
            {
                this.draws = 1
                console.log("Draws updates",this.draws)
            }
            document.querySelector(".winModal").setAttribute("style", "display: flex")
            document.querySelector(".winModal h4").innerText = `Cat's Game Meow`
            document.querySelector(".draw").innerText = this.draws++
        } else {
            this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
            document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;
        }//else
    }

    setScore(){
        let updateScore = this.currentPlayer == this.userOne ? document.querySelector(".playerOneScore") : document.querySelector(".playerTwoScore")
        console.log(updateScore)
        updateScore.innerText = this.currentPlayer.wins
        console.log("current wins for " + this.currentPlayer, this.currentPlayer.wins)
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


    checkWinner() {
        let winCondition = false
        let set = [
            //top
            [this.board[0][1].innerText, this.board[0][0].innerText, this.board[0][2].innerText],
            //middle
            [this.board[1][1].innerText, this.board[1][0].innerText, this.board[1][2].innerText],
            //bottom
            [this.board[2][1].innerText, this.board[2][0].innerText, this.board[2][2].innerText],
            //middle column
            [this.board[0][1].innerText, this.board[1][1].innerText, this.board[2][1].innerText],
            //last column
            [this.board[0][2].innerText, this.board[1][2].innerText, this.board[2][2].innerText],
            //diagnol
            [this.board[0][0].innerText, this.board[1][1].innerText, this.board[2][2].innerText],
            //reverse diagnol
            [this.board[2][0].innerText, this.board[1][1].innerText, this.board[0][2].innerText],
            //first Column
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
        this.wins = 0;
    }
}
let userOne = new User("Cat", "X")
let userTwo = new User("Dog", "O")

let startButton = document.querySelector("#startGame")
startButton.addEventListener('click', () =>{
    Session.totalGamesPlayed.push(new Game(userOne, userTwo))
    document.querySelector(".introModal").setAttribute("style", "display: none")
})

document.querySelector("#resetGame").addEventListener('click', (e) => {
        e.preventDefault()
        let draws = parseInt(document.querySelector(".draw").innerText);
        console.log("this is within event listener",draws++)
        document.querySelector(".winModal").setAttribute("style", "display: none")
        console.log("Total games played", Session.totalGamesPlayed)
        Session.totalGamesPlayed.push(new Game(userOne, userTwo, draws));
        console.log("Session number", Session.totalGamesPlayed.length)
    }
)



