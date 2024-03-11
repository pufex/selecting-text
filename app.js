let selectedText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga debitis maiores deleniti exercitationem quos consectetur iusto illo placeat, quibusdam impedit. Dignissimos, praesentium quidem? Consectetur autem mollitia reprehenderit veniam neque officiis odit vero, corrupti, recusandae tenetur beatae repellat corporis quos? Porro autem quos quod omnis maxime earum rerum dolorem repellat laboriosam.";
let toDisplay, selecting = false, firstSelected = false, lastSelected = false;

const toLettersArray = (string) => {
  let arr = [];
  for(let i = 0; i < string.length; i++) arr.push(string[i]);
  return arr;
}
toDisplay = toLettersArray(selectedText);

const applyTag = (tag, text, start, end) => {
    return text.slice(0, start) + `<${tag}>` + text.slice(start, end+1) + `</${tag}>` + text.slice(end+1);
}

const renderPar = (display, selecting, rectObj) => {
    const readTag = (display, index) => {
        let tag = "", startIndex = index, currentIndex = index;
        while(display[currentIndex] != ">"){
            if(!["<", ">", "/"].includes(display[currentIndex]))
                tag+=display[currentIndex];
            currentIndex++;
        }
        return tag;
    } 

    let onLetterFunctions = {
        bold: {
            shouldApply: false,
            onElement: function(element) {
                element.classList.add("make-bold");
            }
        },
        cursive: {
            shouldApply: false,
            onElement: function(element) {
                element.classList.add("make-cursive");
            }
        }
    }

    let avalaibleFunctions = Object.keys(onLetterFunctions)

    const container = document.querySelector(".container");
    container.innerHTML = "";

    let omit = 0;
    for(let j = 0; j < toDisplay.length; j++){
        if(display[j] == "<"){
            let tagId = readTag(display, j), setTo = true;
            console.log(tagId)
            if(j < display.length && display[j+1] == "/"){
                setTo = false;
                omit += tagId.length+4;
            }else omit += tagId.length+2;  
            console.log(omit);
            avalaibleFunctions.includes(tagId) ? onLetterFunctions[tagId].shouldApply = setTo : null;
        }
        if(omit > 0) omit--; else{
            const span = document.createElement("span");
            span.classList.add("letter");
            if(display[j] == " ") span.classList.add("blank")
            span.innerText = display[j];    
            container.appendChild(span);
            avalaibleFunctions.forEach((letterFunction) => {
                if(onLetterFunctions[letterFunction].shouldApply)
                onLetterFunctions[letterFunction].onElement(span);
            })
            const positionInfo = span.getBoundingClientRect();
            const position = [positionInfo.x, positionInfo.y];
            if(j == 8){
                console.log(position[0], position[1])
            }
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
let container = document.querySelector(".container");
container.addEventListener("mousedown", (e) => {
  rectObj.startPoint = [e.pageX, e.pageY];
  container.addEventListener("mouseup", (e) => {
    rectObj.endPoint = [e.pageX, e.pageY];
    console.log(rectObj)
    displayRect(rectObj);
    renderPar(toDisplay, true, rectObj);
  })
})

renderPar(toDisplay, selecting, rectObj);

const buttons = document.querySelectorAll(".function-button")

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if(lastSelected != false && firstSelected != false)
        toDisplay = toLettersArray(applyTag(button.getAttribute("function-id"), selectedText, firstSelected, lastSelected));
    console.log(toDisplay);
  })
})
