var noOfSquares = 6;
var isHard = true;
var colors = generateRandomColours(noOfSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function() {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  if(isHard){
    isHard = !isHard;
    noOfSquares = 3;
    reset();
  }
})

hardBtn.addEventListener("click", function() {
  easyBtn.classList.remove("selected");
  hardBtn.classList.add("selected");
  if(!isHard){
    isHard = !isHard;
    noOfSquares = 6;
    reset();
  }
})

colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", reset);

applyColors();

function applyColors() {
  squares.forEach((square, index) => {
    if(index < noOfSquares){
      // Add initial colors to square
      square.style.backgroundColor = colors[index];
      // Add event listener to squares
      square.addEventListener("click", onClickSquare)
    } else {
      square.style.display = "none";
    }
  })
}

function changeColors(color) {
  squares.forEach((square, index) => {
    if(index < noOfSquares) {
      square.style.backgroundColor = color;
    }
    else {
      square.style.display = "none";
    }
  })
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColours(num) {
  var colorArray = [];
  for(var i = 0; i < num; i++) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    colorArray.push(color);
  }
  return colorArray;
}

function reset() {
  colors = generateRandomColours(noOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  applyColors();
  h1.style.backgroundColor = "#232323"
  resetButton.textContent = "New Colors";
  if(isHard) {
    squares.forEach(square => {
      square.style.display = "";
    })
  }
}

function onClickSquare() {
  var clickedColor = this.style.backgroundColor;
  if(clickedColor === pickedColor) {
    message.textContent = "Correct";
    changeColors(pickedColor);
    h1.style.backgroundColor = pickedColor;
    resetButton.textContent = "Play Again?"
  } else {
    this.style.backgroundColor = "#232323";
    message.textContent = "Try Again";
  }
}
