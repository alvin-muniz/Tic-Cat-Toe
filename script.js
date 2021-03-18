console.log("script.js loaded")

class Session{
    static totalGamesPlayed = [];
}
class Game {
    constructor(userOne, userTwo) {
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.setCurrentPlayer(userOne)
        this.gameCounter = 1;
        this.startNewGame()
    }

    startNewGame() {
        if(this.gameCounter !== 1){
            this.gameCounter = 1;
        }

        console.log("Should equal 1", this.gameCounter)

        // if(!this.board){
        //     this.createBoard()
        //     console.log("if no board")
        // }
        // else{
            console.log("else start game")
            console.log(document.querySelectorAll(".tile"))
            let nodes = document.querySelectorAll(".tile")
            nodes.forEach((e, index) => {
                console.log(index,"this node " + e.innerHTML)
                e.remove()
                console.log(index,"this node " + e.innerHTML)
                console.log(index,"this node " + e.innerHTML)
                // e.remove()
            });
            console.log("remove nodes",nodes.innerHTML)
            // console.log(nodes);
            // document.querySelector("main").childNodes.forEach(e => {
            //     e.remove()
            // })

            this.createBoard()

        //
        // }
    }


    changePlayer(winCondition) {
        this.gameCounter++
        console.log(this.gameCounter)

        if (winCondition) {
            document.querySelector(".winModal").setAttribute("style","display: flex")
            document.querySelector(".winModal h4").innerText = `Winner is ${this.currentPlayer.name}`
            // document.querySelector("#resetGame").addEventListener('click',(e)=>{
            //     e.preventDefault()
            //     console.log("reset button clicked")
            //     document.querySelector(".winModal").setAttribute("style","display: none")
            //     console.log("Total games played", Session.totalGamesPlayed)
            //     this.startNewGame
            //     // Session.totalGamesPlayed.push(new Game(this.userOne, this.userTwo));
            //   //  this.resetGame()
            // })
        }
         else if (this.gameCounter == 10) {
            document.querySelector(".winModal").setAttribute("style","display: flex")
            document.querySelector(".winModal h4").innerText = `Cat's Game Meow`
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

let startButton = document.querySelector("#startGame")
startButton.addEventListener('click',()=>{
    let userOne = new User("Cat", "X")
    let userTwo = new User("Dog", "O")
    // let newGame = new Game(userOne, userTwo)
    Session.totalGamesPlayed.push(new Game(userOne, userTwo));
    document.querySelector(".introModal").setAttribute("style","display: none")
})

document.querySelector("#resetGame").addEventListener('click',(e)=>{
    e.preventDefault()
    console.log("reset button clicked")
    document.querySelector(".winModal").setAttribute("style","display: none")
    console.log("Total games played", Session.totalGamesPlayed)
    let userOne = new User("Cat", "X")
    let userTwo = new User("Dog", "O")
    Session.totalGamesPlayed.push(new Game(userOne, userTwo));
    console.log("Session number", Session.totalGamesPlayed.length)
    // Session.totalGamesPlayed.push(new Game(this.userOne, this.userTwo));
    // this.resetGame()
}
)



