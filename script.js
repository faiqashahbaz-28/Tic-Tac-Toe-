// Get all game elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const msgBox = document.querySelector(".msg_box");
const newGameBtn = document.querySelector(".new_btn");
const message = document.querySelector("#msg");

// Game variables
let isHumanTurn = true; // Human is O, Computer is X
let movesCount = 0;
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

// Hide message at start
msgBox.classList.add("hide");

// Handle box clicks
boxes.forEach(box => {
    box.addEventListener("click", handleHumanMove);
});

function handleHumanMove() {
    if (!isHumanTurn || this.textContent !== "") return;
    
    // Human makes move
    this.textContent = "O";
    this.style.color = "blue";
    this.disabled = true;
    movesCount++;
    
    // Check game status
    if (checkWin("O")) {
        showWinner("O");
    } else if (movesCount === 9) {
        showDraw();
    } else {
        isHumanTurn = false;
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (isHumanTurn) return;
    
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (boxes[i].textContent === "") {
            boxes[i].textContent = "X";
            if (checkWin("X")) {
                finishComputerMove(i);
                return;
            }
            boxes[i].textContent = "";
        }
    }
    
    // Block human if they can win
    for (let i = 0; i < 9; i++) {
        if (boxes[i].textContent === "") {
            boxes[i].textContent = "O";
            if (checkWin("O")) {
                boxes[i].textContent = "X";
                finishComputerMove(i);
                return;
            }
            boxes[i].textContent = "";
        }
    }
    
    // Take center if available
    if (boxes[4].textContent === "") {
        finishComputerMove(4);
        return;
    }
    
    // Take a random corner
    const corners = [0, 2, 6, 8].filter(i => boxes[i].textContent === "");
    if (corners.length > 0) {
        finishComputerMove(corners[Math.floor(Math.random() * corners.length)]);
        return;
    }
    
    // Take any available spot
    const emptySpots = [...boxes].map((box, i) => box.textContent === "" ? i : null)
                               .filter(i => i !== null);
    if (emptySpots.length > 0) {
        finishComputerMove(emptySpots[Math.floor(Math.random() * emptySpots.length)]);
    }
}

function finishComputerMove(index) {
    boxes[index].textContent = "X";
    boxes[index].style.color = "red";
    boxes[index].disabled = true;
    movesCount++;
    isHumanTurn = true;
    
    if (checkWin("X")) {
        showWinner("X");
    } else if (movesCount === 9) {
        showDraw();
    }
}

function checkWin(player) {
    return winPatterns.some(pattern => 
        pattern.every(index => boxes[index].textContent === player)
    );
}

function showWinner(player) {
    message.textContent = `Congratulations! ${player} wins!`;
    msgBox.classList.remove("hide");
    disableAllBoxes();
}

function showDraw() {
    message.textContent = "Game ended in a draw!";
    msgBox.classList.remove("hide");
    disableAllBoxes();
}

function disableAllBoxes() {
    boxes.forEach(box => box.disabled = true);
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = "";
        box.disabled = false;
    });
    isHumanTurn = true;
    movesCount = 0;
    msgBox.classList.add("hide");
}

// Button event listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
