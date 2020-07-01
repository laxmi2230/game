let clas=_=> document.getElementsByClassName(_);
let id = _ =>document.getElementById(_);
let board = ['','','','','','','','',''];
let ailevel = 1000;
let ai = 'O';//token2
let human = 'X';//token1
let player = human;
let doublePlayer = false;
let gameOver = false;
var click = new Audio("http://soundbible.com/grab.php?id=1705&type=mp3");
let current_player = human;
window.onload = () =>{     
   // initBoard();          
}
let winner = null;
const initBoard =() =>{
id("gameBoard").innerHTML="";
 for(let i =0;i<board.length;i++){
   id("gameBoard").innerHTML+=`
   <button onclick="turn(${i})" class="td" id="${i}"></button>
   `;
  }   
}
const clearBoard=()=>{
    current_player = human;
    initBoard();     
}
const turn=(i)=>{
if(!gameOver){
if(doublePlayer){    
    let check = clas("td"); 
    check[i].value= current_player;
    check[i].innerText = current_player;
    check[i].disabled = true;
    fillBoard();
    if(checkWinner()){
       if(checkWinner()==-1){
           show_result("Player 1 Won");
           gameOver =true;
           clearBoard();
       }
       else if(checkWinner() == 1){
           show_result("Player 2 Won");
           gameOver =true;
           clearBoard();
       }
       else{
           show_result("Match is Tie");
           gameOver =true;
           clearBoard();
       }
       
    }
current_player=(current_player==human)?ai:human;
}else{
    let check = clas("td"); 
    check[i].value= human;
    check[i].innerText = human;
    check[i].disabled = true;
    fillBoard();
    var result = checkWinner();    
if(result){     
        if(checkWinner()==-1){
           show_result("You Won");
           gameOver =true;
           clearBoard();
       }
       else if(checkWinner() == 1){
           show_result("Computer Won");
           gameOver =true;
           clearBoard();
       }
       else{
           show_result("Match is Tie");
           gameOver =true;
           clearBoard();
       }
       
}else{         
        check[aimove()].value = ai;
        check[aimove()].innerText=ai;         
        check[aimove()].disabled = true;            
        fillBoard();
           if(checkWinner()){
             if(checkWinner()==-1){
           show_result("You Won");
           gameOver =true;
           clearBoard();
       }
       else if(checkWinner() == 1){
           show_result("Computer Won");
           gameOver =true;
           clearBoard();           
       }
       else{
           show_result("Match is Tie");
           gameOver =true;
           clearBoard();
       }
        
           }        
       }
    } 
  }  
}
const fillBoard=()=>{
for(let i =0;i<clas("td").length;i++)board[i] = clas("td")[i].value;
}       
const aimove=()=>{
  let value = -Infinity;
  let index;
  for(var i = 0; i<board.length; i++){
     if (board[i] !== '') continue;
         board[i] = ai;
         let newvalue = minimax(0, human);
         board[i] = '';
         if (newvalue > value) {
                value = newvalue;
                index = i;                
            }
        }        
   return index;
}

const minimax=(depth, player)=>{
let score = checkWinner();      
  if(score !== false)return score;
  else if(score === 'TIE')return 0;         
if (player === ai) {
 var value = -Infinity;
for (var i = 0; i < board.length; i++) {
     if(board[i] == ''){
     board[i] = ai;
     let newvalue = minimax(depth+1,human);
      board[i] = '';
      value=(newvalue>value)?newvalue:value;        
      if(depth == ailevel)return value;
                
    }      
}
     return value;
     } 
      else {
var value = Infinity;
for (var i = 0; i < board.length; i++) {
  if (board[i] == '') {
      board[i] =human;
      let newvalue = minimax(depth+1,ai);
      board[i] = '';
      value=(newvalue<value)?newvalue:value;             
      if(depth == ailevel)return value;
                
    }      
}
        return value;
     }
}

const checkWinner=()=>{
for(var i = 0; i<9; i+=3)if(board[i]!=''&&board[i+1]===board[i]&&board[i+2]===board[i])return (board[i] === human) ? -1 : 1;            
for(var i = 0; i<3; i++)if(board[i]!= ''&&board[i+3]===board[i]&&board[i+6]===board[i])return (board[i] === human) ? -1 : 1;
if(board[2] != '' && board[4] === board[2] && board[6] == board[2])return (board[2] === human) ? -1 : 1;        
if(board[0] != '' && board[4] === board[0] && board[8] == board[0])return (board[0] === human) ? -1 : 1;        
for(var i=0;i<board.length;i++)if(board[i] === '')return false;                    
      return 'TIE';
}

//Drop Effect
window.addEventListener('click',(ev)=>{
let drop = document.createElement('div');
drop.classList.add("drop");
drop.style.top = ev.clientY +'px';
drop.style.left = ev.clientX + 'px';
try{
 click.play();
setTimeout(()=>{
   click.currentTime = 0;
   click.pause();
}, 200);
}catch(e){}
document.body.appendChild(drop);       
setTimeout(()=>document.body.removeChild(drop),300);
});
//Normal stufss
const aiSec=()=>{    
     mainPage.style.display ="none";
     aiLevel.style.display ="block";
     onlinePlayer = false;      
     info.innerText="Select a level";        
}
const multiL=()=>{
    mainPage.style.display ="none";
    doublePlayer = true;    
    gamePlay.style.display ="block";
    header_close_icon.style.display ="inline"
    clearBoard();
    info.innerText="Multiplayer Mode";
}
const setLevel =(e)=>{
   aiLevel.style.display ="none";   
    switch(e){
        case "H":
           ailevel = 1000;
            info.innerText="Hard Level";
           break;
        case "E":
           ailevel=1;
            info.innerText="Easy Level";
           break;
        case "M":
           ailevel = 5;
            info.innerText="Medium Level";
           break;
    }
   gamePlay.style.display ="block";
   doublePlayer = false;   
   clearBoard();
   header_close_icon.style.display ="inline";   
}
const backMainPage=()=>{
    gamePlay.style.display ="none";
    mainPage.style.display ="block";
    header_close_icon.style.display ="none";    
    info.innerText="Tic Tac Toe";
}


const show_result=(e)=>{
    data.innerText=e;
    result.style.visibility = "visible";
    result.style.left ="50%";
}
const hide_result=()=>{
    result.style.left ="-50%";
    result.style.visibility = "hidden";
    gameOver =false;
} 
 