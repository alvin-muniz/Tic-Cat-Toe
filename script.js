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

    changePlayer(e){
        // console.log(this.currentPlayer);
        // console.log(this.currentPlayer);
        if(this.currentPlayer == this.userTwo)
        { console.log(this.gameCounter++)}

        console.log("Check winner output", this.checkWinner());

        if(e)
        {
            console.log("checkWinner in changePlayer hit")
            document.querySelector("h4").innerText = `Winner is ${this.currentPlayer.name}`
        }
        else{
        this.currentPlayer = this.currentPlayer == this.userOne ? this.userTwo : this.userOne;
        document.querySelector("#currentPlayer").innerText = this.currentPlayer.name + " " + this.currentPlayer.marker;}

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
                        tile.addEventListener('click',(e)=>{
                            tile.innerText = this.currentPlayer.marker;
                            console.log(this.currentPlayer.marker)
                            tile.setAttribute("style","pointer-events: none")
                            this.changePlayer(this.checkWinner())
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
        let winCondition = false
        let set = [
            [this.board[0][1].innerText, this.board[0][0].innerText, this.board[0][2].innerText ],
            [this.board[1][1].innerText, this.board[1][0].innerText, this.board[1][2].innerText ],
            [this.board[2][1].innerText, this.board[2][0].innerText, this.board[2][2].innerText ],
            [this.board[0][1].innerText, this.board[1][1].innerText, this.board[2][1].innerText],
            [this.board[0][2].innerText, this.board[1][2].innerText, this.board[2][2].innerText],
            [this.board[0][0].innerText, this.board[1][1].innerText, this.board[2][2].innerText],
            [this.board[2][0].innerText, this.board[1][1].innerText, this.board[2][2].innerText]
        ]

        console.log()
        set.forEach((e,index)=>{
            let player = [this.currentPlayer.marker, this.currentPlayer.marker, this.currentPlayer.marker].toString()
            // console.log("array inside",e.toString())
            // console.log(player)

            // return e.toString() === player ? true : false;
            //

            console.log(e.toString() === player)
            if(e.toString() === player)
            {
                console.log("Yessum! This combination won " + index)
                this.clearBoard()
                winCondition = true;
            }

            // console.log("for each",e)
            // console.log("current player", player)

            // e == [this.currentPlayer.marker, this.currentPlayer.marker, this.currentPlayer.marker] ? console.log("winner") : console.log("not yet")
        })
        console.log("Winning Condition", winCondition)

        return winCondition
        //
        // if(this.board[0][1].innerText == this.board[0][0].innerText && this.board[0][0].innerText == this.board[0][2].innerText) {
        // // if(set.includes([this.currentPlayer.marker, this.currentPlayer.marker, this.currentPlayer.marker])){
        //     console.log("winner!")
        //     this.clearBoard()
        //     return true;
        // }else if (this.board[1][1].innerText == this.board[1][0].innerText && this.board[1][0].innerText == this.board[1][2].innerText){
        //     console.log("middle row")
        //     this.clearBoard()
        //     return true;
        // }else if (this.board[2][1].innerText == this.board[2][0].innerText && this.board[2][0].innerText == this.board[2][2].innerText){
        //     console.log("bottom row")
        //     this.clearBoard()
        //     return true;
        // }else if (this.board[0][1].innerText == this.board[1][1].innerText && this.board[0][1].innerText == this.board[2][1].innerText){
        //     console.log("middle down")
        //     this.clearBoard()
        //     return true;
        // }else if(this.board[0][2].innerText == this.board[1][2].innerText && this.board[0][2].innerText == this.board[2][2].innerText){
        //     console.log("last column")
        //     this.clearBoard()
        //     return true;
        // } else if(this.board[0][0].innerText == this.board[1][1].innerText && this.board[0][0].innerText == this.board[2][2].innerText){
        //     console.log("middle diagnol")
        //     this.clearBoard()
        //     return true;
        // }else if(this.board[2][0].innerText == this.board[1][1].innerText && this.board[0][0].innerText == this.board[2][2].innerText){
        //     console.log("2nd diagnol")
        //     this.clearBoard()
        //     return true;
        // }else{
        //     return false;
        // }
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

newGame.startNewGame()
console.log(document.querySelector("#currentPlayer"))


// function input(x,y){
//     console.log(this.board[x][y])
//     this.board[x][y] = "X"
//     document.querySelector(`.location-${x}${y}`).innerText = 'X'
// }


