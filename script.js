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
 //turns of two players
boxs.forEach  ((box) => {
    box.addEventListener("click" , () =>{
        if (turnO == true){
            box.innerText = "O" ;
            box.style.color = "blue" ;
            turnO = false;
        }else{
            box.innerText = "X" ;
            box.style.color = "red" ;
            turnO = true;
        }
        box.disabled = true ;
        count++;
        let isWinner = checkWinner ();
        if(count === 9 && count !== isWinner){
        drawGame();
        } 
});
});
  

const drawGame = () =>{
    msgline.innerText = `The game is Draw`;
        msgBox.classList.remove("hide");
        disabledboxs();
}
// showing winner of the game
const addWinner = (winner) =>{
    msgline.innerText = `Congratulations! Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disabledboxs();
}
// disabeling buttons
const disabledboxs =()=>{
    for(let box of boxs){
        box.disabled = true;
    }
}
//enabling buttons
const enabledboxs = ()=>{
    for(let box of boxs){
        box.disabled = false;
        box.innerText ="";
    }
}
//function for restarting game
const playAgain = ()=>{
    turnO = true ;
    count = 0 ;
    enabledboxs();
    msgBox.classList.add("hide") ;
}

//checking the winner of game
const checkWinner = () =>{
    for(let pattern of winnArry){
        let pos1 = boxs[pattern[0]].innerText;
        let pos2 = boxs[pattern[1]].innerText;
        let pos3 = boxs[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                addWinner(pos1);
            }
        }
    }
}
//on clicking new game button
newGame.addEventListener("click",()=>{
    playAgain();
});
//on clicking reset button
resetBtn.addEventListener("click",()=>{
    playAgain();
});