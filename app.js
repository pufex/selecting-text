const page = document.querySelector("html")
let selectedText = "Do re mi la fasola";
let toDisplay, selecting = false, firstSelected = false, lastSelected = false;

const makeBold = (string, start, end) => {
  let newString = string.slice(0, start) + "<b>" + string.slice(start, end) + "</b>" + string.slice(end);
  return newString;
}

const getCurrentFunction = (els) => {
  els.forEach((el) => {
    if(el.classList.contains("active")) {
      return el.classList[1];
    }
  })
  return false;
}

const toLettersArray = (string) => {
  let arr = [];
  for(let i = 0; i < string.length; i++) arr.push(string[i]);
  return arr;
}
toDisplay = toLettersArray(selectedText);

const renderPar = (display, selecting, rectObj) => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for(let j = 0; j < toDisplay.length; j++) {
    const span = document.createElement("span");
    span.classList.add("letter")
    span.innerText = display[j];
    container.appendChild(span);
    const positionInfo = span.getBoundingClientRect();
    const position = [positionInfo.x, positionInfo.y];
    if(position[0] > rectObj.startPoint[0] && position[0] < rectObj.endPoint[0] && position[1] > rectObj.startPoint[1] && position[1] < rectObj.endPoint[1]) {
      span.classList.add("selected");
    }
    if(span.classList.contains("selected")){
      console.log("has selected")
      if(firstSelected == false)
        firstSelected = j;
      else lastSelected = j;
    }
  }
  console.log(firstSelected, lastSelected)
}

const displayRect = (rectObj) => {
  const createdCanvas = document.querySelectorAll(".selecting-rectangle");
  if(createdCanvas) 
    createdCanvas.forEach((canvas) => {
      canvas.remove(); 
    })
  const canvas = document.createElement("canvas");
  canvas.classList.add("selecting-rectangle");
  canvas.ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.ctx;
  let x = 0, y = 0;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "blue"
  ctx.fillRect(rectObj.startPoint[0],rectObj.startPoint[1], rectObj.endPoint[0] - rectObj.startPoint[0], rectObj.endPoint[1] - rectObj.startPoint[1]);
  ctx.restore();
  const body = document.querySelector("body");
  body.appendChild(canvas);
}


let rectObj = {
  startPoint: [0,0], 
  endPoint: [0,0],
}

let viewport = document.querySelector("html");
viewport.addEventListener("mousedown", (e) => {
  rectObj.startPoint = [e.pageX, e.pageY];
  viewport.addEventListener("mouseup", (e) => {
    rectObj.endPoint = [e.pageX, e.pageY];
    displayRect(rectObj);
    renderPar(toDisplay, true, rectObj);
    // let currentFunction = getCurrentFunction(buttons);
    let currentFunction = "bold";
    switch(currentFunction){
      default: break;
      case "bold": 
        selectedText = makeBold(selectedText, firstSelected, lastSelected);
        console.log(selectedText);
        break;
    }
  })
})

renderPar(toDisplay, selecting, rectObj);

const buttons = document.querySelectorAll(".function-button")

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((otherButton, otherIndex) => {
      if(otherIndex == index) {
        otherButton.classList.add("active");
      }else otherButton.classList.remove("active");
    })
  })
})

