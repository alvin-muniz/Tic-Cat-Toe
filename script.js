console.log("script.js loaded")

let mainGame = document.querySelector('main')

const board = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"]
]

displayBoard()

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
                mainGame.appendChild(tile);
                }
            )
        }
    )
}

