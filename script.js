const gridContainer = document.querySelector(".grid-container");

gridContainer.addEventListener('click' , (e) => {
    console.log(e.target.id);
})

const currentPlayer = "X";
displayCurrPlayer();

//below code display the player whose have to make the move
const topDisplay = document.querySelector("[data-topDisplay]");
function displayCurrPlayer(){
    topDisplay.innerText = `Current Player ${currentPlayer}`;
}

function togglePlayer(){
    if(currentPlayer == "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";
}