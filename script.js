class trackMoves{
    constructor(){
        this.row_0 = 0;
        this.row_1 = 0;
        this.row_2 = 0;
        this.col_0 = 0;
        this.col_1 = 0;
        this.col_2 = 0;
        this.diagonal = 0;
        this.reverseDiagonal = 0;
    }

    modifyRow(rowNumber) {
        if(rowNumber == 0)
            this.row_0++;
        else if(rowNumber == 1)
            this.row_1++;
        else
            this.row_2++;
    }

    modifyCol(colNumber) {
        if(colNumber == 0)
            this.col_0++;
        else if(colNumber == 1)
            this.col_1++;
        else
            this.col_2++;
    }

    modifyDiagonal(flag){
        if(flag == 1)
            this.diagonal++;
        else   
            this.reverseDiagonal++;
    }

    
    checkForWinner(){
        if(this.row_0==3||this.row_1==3||this.row_2==3||this.col_0==3||this.col_1==3||this.col_2==3||this.diagonal==3||this.reverseDiagonal == 3)
        return 1;
    
        return 0;
    }

    resetCodeBase(){
        this.row_0 = 0;
        this.row_1 = 0;
        this.row_2 = 0;
        this.col_0 = 0;
        this.col_1 = 0;
        this.col_2 = 0;
        this.diagonal = 0;
        this.reverseDiagonal = 0;
    }
}

const playerx = new trackMoves();
const playery = new trackMoves();

var currentPlayer = "X";

//below code display the player whose have to make the move
const topDisplay = document.querySelector("[data-topDisplay]");
function displayCurrPlayer(){
    topDisplay.innerText = `Current Player : ${currentPlayer}`;
}
displayCurrPlayer();

function togglePlayer(){
    if(currentPlayer == "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";
}

const gridContainer = document.querySelector(".grid-container");

function doMoves(player , coordinate){
    let row = Number(coordinate[0]);
    let col = Number(coordinate[1]);
    let result = 0;
    player.modifyRow(row);
    player.modifyCol(col);
    if(row == col){
        player.modifyDiagonal(1);
    }
    if(row+col == 2){
        player.modifyDiagonal(0);
    }
    result = player.checkForWinner();
    return result;
}

function noteMoves(currPlayer,coordinate){
    
    if(currPlayer == "X"){
        return doMoves(playerx,coordinate);
    }
    else{
        return doMoves(playery,coordinate);
    }
}

const button = document.querySelector(".btn");

gridContainer.addEventListener('click' , (e) => {
    e.target.innerText = `${currentPlayer}`;
    button.innerText = "Reset Game";
    if(noteMoves(currentPlayer,e.target.id) == 1){
        //will come inside if a player has won the match
        topDisplay.innerText = `Player ${currentPlayer} has won!`;
    }
    else{
        togglePlayer();
        displayCurrPlayer();
    }
})

button.addEventListener('click' , ()=>{
    //we have to reset the whole game
    button.innerText = "Start Game";
    const allBoxes = document.querySelectorAll(".grid-item");
    // console.log(allBoxes);
    allBoxes.forEach((ele)=>{
        ele.innerText = "";
    })
    //also undo all players moves 
    playerx.resetCodeBase();
    playery.resetCodeBase();
})


