// GMAIL BLOCK

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "Invalid gmail format"
        gmailResult.style.color = "red"
    }
}

//MOVE BLOCK

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionX = 0;
let positionY = 0;
let direction = 'right';

const maxWidth= parentBlock.offsetWidth - childBlock.offsetWidth;
const maxHeight= parentBlock.offsetHeight - childBlock.offsetHeight;

const moveBlock = () => {
    if (direction === 'right') {
        positionX++
        if (positionX >= maxWidth) direction = 'down'
    } else if (direction === 'down') {
        positionY++
        if (positionY >= maxHeight) direction = 'left'
    } else if (direction === 'left') {
        positionX--
        if (positionX <= 0) direction = 'up'
    } else if (direction === 'up') {
        positionY--
        if (positionY <= 0) direction = 'right'
    }

    childBlock.style.left = `${positionX}px`
    childBlock.style.top = `${positionY}px`

    requestAnimationFrame(moveBlock)
};

moveBlock();

// STOPWATCH

const seconds = document.querySelector('#seconds')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

let interval
let countSeconds = 0

startButton.onclick = () => {
    if (!interval) {
        interval = setInterval(() => {
            countSeconds++
            seconds.innerHTML = countSeconds
        }, 1000)
    }
}

stopButton.onclick = () => {
    clearInterval(interval)
}

resetButton.onclick = () => {
    clearInterval(interval)
    countSeconds = 0
    seconds.innerHTML = countSeconds
}
