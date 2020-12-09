const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const score = document.getElementById("score")
const highScore = document.getElementById("high-score")
const gameInfo = document.getElementById("game-info")
const gameInfoContent = document.getElementById("game-info-content")
const gameInfoButtonClose = document.getElementById("game-info-close")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let snakeHead = ""
let appleIndex = 0
let goldenAppleIndex = 0
let currentScore = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
let randGoldenApple = 0

console.log(randGoldenApple)
function createGrid() {
    for (let i = 0; i < width * width; i++ ) {

        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)

        squares.push(square)
    }
}

createGrid()

function move() {
    if(
        (currentSnake[0] + width >= (width * width) && direction === width) || //bottom check
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === (width - 1) && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        
        return  clearInterval(timerId)
    }
    
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")
    
    currentSnake.unshift(currentSnake[0] + direction)
    
    squares[currentSnake[0]].classList.add("snake", "snake-head")
    
    squares[currentSnake[0]].style.transform = snakeHead
    
    if(squares[currentSnake[0] - direction].classList.contains('snake-head')) {
        squares[currentSnake[0] - direction].classList.remove('snake-head')
        squares[currentSnake[1]].style.transform = "rotate(0deg)"
    }

    if(squares[currentSnake[0]] === squares[appleIndex] || squares[currentSnake[0]] === squares[goldenAppleIndex]) { //squares[currentSnake[0]].classList.contains('apple')
        squares[appleIndex].classList.remove('apple')
        squares[goldenAppleIndex].classList.remove('golden-apple')
        
        squares[currentSnake.push(tail)]
        currentScore += 1
        score.textContent = currentScore
        if (currentScore >= highScore.textContent) {
            highScore.innerText = currentScore
        }
        if (currentScore === randGoldenApple) {
            currentScore += 2
            generateGoldenApples()
    
        } else {
            generateApples()
        }
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
}

startButton.addEventListener('click', startGame)

function startGame() {
    
    clearInterval(timerId)
    startSnake()
    score.innerText = 0
    currentScore = 0
    direction = 1
    snakeHead = "rotate(0deg)"
    randGoldenApple = Math.floor(Math.random() * 5) + 2
    intervalTime = 1000
    speed = 0.9
    
    
    timerId = (setInterval(move, intervalTime))
    squares[appleIndex].classList.remove('apple')
    generateApples();
}


function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


function generateGoldenApples() {
    do {
        goldenAppleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[goldenAppleIndex].classList.contains('snake') || squares[goldenAppleIndex].classList.contains('apple'))
    squares[goldenAppleIndex].classList.add('golden-apple')
}


function startSnake() {
    squares[currentSnake[0]].style.transform = "rotate(0deg)"
    currentSnake.forEach(index => squares[index].classList.remove("snake", "snake-head"))
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[currentSnake[0]].classList.add('snake-head')
}
/*
 39 right
 38 up
 37 left
 40 down
*/

document.addEventListener('keyup', control)

function control(event) {
    switch (event.keyCode) {
        case 39:
            snakeHead = "rotate(0deg)"
            direction = 1
            break
        case 38:
            snakeHead = "rotate(270deg)"
            direction =- width
            break
        case 37:
            
            snakeHead = "rotate(180deg)"
            direction = -1
            break
        case 40:
            
            snakeHead = "rotate(90deg)"
            direction =+ width
            break
        default:
            snakeHead = "rotate(0deg)"
    }
}

gameInfo.addEventListener('click', function() {
   gameInfoContent.classList.toggle('show-modal')
   
})
gameInfoButtonClose.addEventListener('click', function() {
    gameInfoContent.classList.toggle('show-modal')
})