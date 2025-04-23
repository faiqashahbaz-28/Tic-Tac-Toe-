// making all the nodes accessible
let boxs = document.querySelectorAll(".box"); 
let resetBtn = document.querySelector("#reset");
let msgBox = document.querySelector(".msg_box");
let newGame = document.querySelector(".new_btn");
let msgline = document.querySelector("#msg");

msgBox.classList.add("hide");

let turnO = true ;
let count = 0 ;
// winning possibilities
let winnArry = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function computerMove() {
   // First check if computer can win
    for (let i = 0; i < 9; i++) {
        if (boxs[i].innerText === '') {
            boxs[i].innerText = 'X';
            if (checkWinner(true) === 'X') {
                boxs[i].style.color = "red";
                boxs[i].disabled = true;
                return;
            }
            boxs[i].innerText = '';
        }
    }
    
    // 2. Block human if they can win next move
    for (let i = 0; i < 9; i++) {
        if (boxs[i].innerText === '') {
            boxs[i].innerText = 'O';
            if (checkWinner(true) === 'O') {
                boxs[i].innerText = 'X'; // Block by taking this spot
                boxs[i].style.color = "red";
                boxs[i].disabled = true;
                return;
            }
            boxs[i].innerText = '';
        }
    }
    
    // 3. Take center if available
    if (boxs[4].innerText === '') {
        boxs[4].innerText = 'X';
        boxs[4].style.color = "red";
        boxs[4].disabled = true;
        return;
    }
    
    // 4. Take a random corner
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(i => boxs[i].innerText === '');
    if (emptyCorners.length > 0) {
        const randomCorner = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
        boxs[randomCorner].innerText = 'X';
        boxs[randomCorner].style.color = "red";
        boxs[randomCorner].disabled = true;
        return;
    }
    
    // 5. Take any random available spot
    const availableSpots = Array.from(boxs).map((box, index) => box.innerText === '' ? index : null)
                             .filter(val => val !== null);
    if (availableSpots.length > 0) {
        const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
        boxs[randomSpot].innerText = 'X';
        boxs[randomSpot].style.color = "red";
        boxs[randomSpot].disabled = true;
    }
}

// Modified checkWinner to optionally not show message (for AI calculations)
const checkWinner = (silent = false) => {
    for(let pattern of winnArry) {
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                if (!silent) addWinner(pos1);
                return pos1;
            }
        }
    }
    return null;
}

// turns of two players
boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // Human's turn (O)
            box.innerText = "O";
            box.style.color = "blue";
            box.disabled = true;
            turnO = false;
            count++;
            
            let winner = checkWinner();
            if (!winner && count < 9) {
                // Computer's turn after a short delay
                setTimeout(() => {
                    computerMove();
                    count++;
                    turnO = true;
                    winner = checkWinner();
                    if (!winner && count === 9) {
                        drawGame();
                    }
                }, 500);
            } else if (count === 9 && !winner) {
                drawGame();
            }
        }
    });
});

const drawGame = () => {
    msgline.innerText = `The game is Draw`;
    msgBox.classList.remove("hide");
    disabledboxs();
}

// showing winner of the game
const addWinner = (winner) => {
    msgline.innerText = `Congratulations! Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disabledboxs();
}

// disabeling buttons
const disabledboxs = () => {
    for(let box of boxs) {
        box.disabled = true;
    }
}

//enabling buttons
const enabledboxs = () => {
    for(let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
}

//function for restarting game
const playAgain = () => {
    turnO = true;
    count = 0;
    enabledboxs();
    msgBox.classList.add("hide");
}

//on clicking new game button
newGame.addEventListener("click", () => {
    playAgain();
});

//on clicking reset button
resetBtn.addEventListener("click", () => {
    playAgain();
});
           


});
//on clicking reset button
resetBtn.addEventListener("click",()=>{
    playAgain();
});
