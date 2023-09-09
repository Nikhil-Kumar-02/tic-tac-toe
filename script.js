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
        if(this.row_0==3||this.row_1==3||this.row_2==3||this.col_0==3||this.col_1==3||this.col_2==3||this.diagonal==3||this.reverseDiagonal == 3){
            // return 1;
            //if won we also have to color the winner winning moves
            const checkConditions = [
                this.row_0==3,
                this.row_1==3,
                this.row_2==3,
                this.col_0==3,
                this.col_1==3,
                this.col_2==3,
                this.diagonal==3,
                this.reverseDiagonal == 3
            ];
            //functions to color them
            function colorRow(row){
                for(let col = 0;col<3;col++){
                    var targetId = ""+row+col;
                    const cell = document.getElementById(targetId);
                    cell.style.backgroundColor = "green";
                }
            }
            function colorCol(col){
                for(let row = 0;row<3;row++){
                    var targetId = ""+row+col;
                    const cell = document.getElementById(targetId);
                    cell.style.backgroundColor = "green";
                }
            }
            function colorDia(offset){
                for(let i = 0;i<3;i++){
                    let row = i;
                    let col = i+offset;
                    if(col >2)
                        col = col%2;

                    var targetId = ""+row+col;
                    const cell = document.getElementById(targetId);
                    cell.style.backgroundColor = "green";
                }
            }
            //now we can check which among them is correct
            for(let i = 0;i<checkConditions.length;i++){
                if(checkConditions[i]){
                    //this row or col or dia has satisfied
                    if(i<=2){
                        colorRow(i);
                    }
                    else if(i<=5){
                        colorCol(i-3);
                    }
                    else if(i == 6){
                        colorDia(0)
                    }
                    else{
                        colorDia(2);
                    }
                }
            }
            return 1;
        }
        
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

function removelistener(){
    gridContainer.removeEventListener('click',gridCellEvenlistener);
}

function gridCellEvenlistener(e){
    e.target.innerText = `${currentPlayer}`;
    button.innerText = "Reset Game";
    if(noteMoves(currentPlayer,e.target.id) == 1){
        //will come inside if a player has won the match
        topDisplay.innerText = `Player ${currentPlayer} has won!`;
        //now even if i click nothing should be displayed on the screen
        removelistener();
    }
    else{
        togglePlayer();
        displayCurrPlayer();
    }
}

gridContainer.addEventListener('click' ,gridCellEvenlistener)

button.addEventListener('click' , ()=>{
    //we have to reset the whole game
    button.innerText = "Start Game";
    const allBoxes = document.querySelectorAll(".grid-item");
    // console.log(allBoxes);
    allBoxes.forEach((ele)=>{
        ele.innerText = "";
        ele.style.backgroundColor = "brown";
    })
    //also undo all players moves 
    playerx.resetCodeBase();
    playery.resetCodeBase();
})


