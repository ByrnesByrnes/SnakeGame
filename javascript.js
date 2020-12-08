const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const score = document.getElementById("score")
const gameInfo = document.getElementById("game-info")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let snakeHead = ""
let appleIndex = 0
let currentScore = 0
let gameSpeed = 1000

function createGrid() {
    for (let i = 0; i < 100; i++ ) {

        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)

        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))

function move() {
    if(
        (currentSnake[0] + width >= (width * width) && direction === width) || //bottom check
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === (width - 1) && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        console.log('hit Wall')
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

    if(squares[currentSnake[0]] === squares[appleIndex]) { //squares[currentSnake[0]].classList.contains('apple')
        squares[appleIndex].classList.remove('apple')
        squares[currentSnake.push(tail)]
        currentScore += 1
        score.textContent = currentScore
        generateApples()
        gameSpeed -= 100
        console.log(gameSpeed)
        timerId = (setInterval(move, gameSpeed))
    }



}
move()
console.log(gameSpeed)
// let timerId = (setInterval(move, gameSpeed))



function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
       
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApples();
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
            console.log('left pressed')
            snakeHead = "rotate(180deg)"
            direction = -1
            break
        case 40:
            console.log('down pressed')
            snakeHead = "rotate(90deg)"
            direction =+ width 
            break
        default:
            break
    }

}