let dragItem = document.querySelector("#box");
let container = document.querySelector("#container");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
    } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
    active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    e.preventDefault();
    if (active) {
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
        calculateIndicatorLines();
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

const calculateIndicatorLines = function(){
    const ele = document.getElementById('box');
    const topLine = document.getElementById('top');
    const leftLine = document.getElementById('left');
    const bottomLine = document.getElementById('bottom');
    const rightLine = document.getElementById('right');

    const topValue = document.getElementById('top-div-value');
    const leftValue = document.getElementById('left-div-value');
    const bottomValue = document.getElementById('bottom-div-value');
    const rightValue = document.getElementById('right-div-value');
    const widthValue = document.getElementById('width-div-value');
    const heightValue = document.getElementById('height-div-value');


    const postionInformation = ele.getBoundingClientRect();

    // topLine
    topLine.style.height = `${postionInformation.top}px`;
    topLine.style.left = `${postionInformation.left + (postionInformation.width/2)}px`

    // bottomLine
    bottomLine.style.height = `${postionInformation.bottom + 2}px`;
    bottomLine.style.left = `${postionInformation.left + (postionInformation.width) + 3}px`

    // leftLine
    leftLine.style.width = `${postionInformation.left}px`;
    leftLine.style.top = `${postionInformation.top + (postionInformation.height/2)}px`

    // rightLine
    rightLine.style.width = `${postionInformation.right}px`;
    rightLine.style.top = `${postionInformation.bottom + 3}px`


    topValue.innerText = postionInformation.top.toFixed(0);
    leftValue.innerText = postionInformation.left.toFixed(0);
    bottomValue.innerText = postionInformation.bottom.toFixed(0);
    rightValue.innerText = postionInformation.right.toFixed(0);
    widthValue.innerText = postionInformation.width.toFixed(0);
    heightValue.innerText = postionInformation.height.toFixed(0);
}

calculateIndicatorLines();