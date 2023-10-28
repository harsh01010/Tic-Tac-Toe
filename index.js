console.log("tic tac toe");

const move = [
  "./assets/turn1.mp3",
  "./assets/turn2.mp3",
  "./assets/turn3.mp3",
  "./assets/turn4.mp3",
];
const lost = ["./assets/5.mp3"];
const won = ["./assets/4.mp3"];
const tie = ["./assets/9.mp3"];

function generate_ramdom(min, max) {
  // max and min both are included.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
function turnAudio() {
  let i = generate_ramdom(0, 3);
  audio = new Audio(move[i]);
  audio.play();
}
function winAudio() {
  audio = new Audio(won);
  audio.play();
}
function drawAudio() {
  audio = new Audio(tie);
  audio.play();
}

let turn = "X";

const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};
var result = false;
var draw = true;

const checkWinner = () => {
  let boxText = document.querySelectorAll(".boxText");
  let changetext = document.querySelector("#greet");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = "";

  wins.forEach((e) => {
    if (
      boxText[e[0]].innerText !== "" &&
      boxText[e[0]].innerText === boxText[e[1]].innerText &&
      boxText[e[1]].innerText === boxText[e[2]].innerText
    ) {
      winner = boxText[e[0]].innerText;
      boxText[e[0]].style.color = "#d2a72d";
      boxText[e[1]].style.color = "#d2a72d";
      boxText[e[2]].style.color = "#d2a72d";

    }
  });

  if (winner !== "") {
    changetext.innerText = `${winner} Won!!`;
    winAudio();
    document.querySelector(".imgBox img").classList.remove("disp");
    document.querySelector(".info").innerText = `Click Below To Reset.`;
    result = true;
  } else {
    let  draw =true;
    boxText.forEach((e) => {
      if (e.innerText === "") draw = false;
    });
    if (draw) {
      changetext.innerText = `DRAW!!`;
      drawAudio();
      document.querySelector(".info").innerText = `Click Below To Reset.`;
    }
  }
};


let boxes = document.querySelectorAll(".box");
boxes.forEach(function (box) {
  box.addEventListener("click", function (e) {
    if (!result) {
      boxText = box.querySelector(`.boxText`);
      if (boxText.innerText === "") {
        boxText.innerText = turn;
        turn = changeTurn();
        turnAudio();
        document.querySelector(".info").innerText = "Turn for " + turn;
        checkWinner();
      }
    }
  });
});

const reset = () => {
  let boxText = document.querySelectorAll(".boxText");
  boxText.forEach((e) => {
    e.innerText = "";
  });
  turn = changeTurn();
  document.querySelector(".info").innerText = "Turn for " + turn;
  document.querySelector("#greet").innerText = "Welcome to Tic Tac Toe";
  result = false;
  let draw = true;
  document.querySelector('.imgBox').querySelector('img').classList.add('disp');
};

document.querySelector("#reset").addEventListener("click", reset);


const darkMode = function(){
  document.querySelector('body').classList.toggle("dark");
  boxes.forEach((box)=>box.classList.toggle('box-borderColor-change'));
  document.querySelector('nav').classList.toggle('nav-bg-change');
  document.querySelector('#reset').classList.toggle('reset-bgc-change');
  console.log(document.querySelector('#reset').classList); 
}
document.querySelector('.changeTheme').addEventListener('click',darkMode);