const boxes = document.querySelectorAll('.board__square')
const title = document.querySelector('.board__title')
const button = document.querySelector('.restart')
const streakX = document.querySelector('.winTrackX')
const streakO = document.querySelector('.winTrackO')

let currentPlayer = 'X'
let gameOver = false
let board = new Array(9)
let winStreak = ''
let counterx = 0
let countero = 0

boxes.forEach((box, index) => box.addEventListener('click', () => {
    button.disabled = false

    if (box.innerHTML || gameOver) {
        return
    }
    box.innerHTML = currentPlayer
    board[index] = currentPlayer

    if (checkWin()) {
        title.innerHTML = `${currentPlayer} WON!!`
        gameOver = true
        keepTrack()
        return
    }

    if (checkDraw()) {
        title.innerHTML = `It is a draw!`
        return
    }
    switchPlayers()
    title.innerHTML = `${currentPlayer}'s turn`
}))

function checkDraw() {
    for (let i = 0; i < board.length; ++i) {
        if (!board[i]) {
            return false
        }
    }
    return true
}

function checkWin() {

    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winningCombos.length; ++i) {
        const matchingCombos = winningCombos[i]

        let symbol1 = board[matchingCombos[0]]
        let symbol2 = board[matchingCombos[1]]
        let symbol3 = board[matchingCombos[2]]

        if (!symbol1 || !symbol2 || !symbol3) {
            continue
        }

        if (symbol1 === symbol2 && symbol2 === symbol3) {
            return true
        }
    }

}

function restartGame() {
    gameOver = false
    board = new Array(9)
    boxes.forEach((box) => {
        box.innerHTML = ''
        title.innerHTML = `${currentPlayer}'s turn`
    })
    button.disabled = true
    return
}

function switchPlayers() {
    return currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

function keepTrack() {
    if (currentPlayer === 'O') {
        countero += 1
    } 
    else {
        counterx += 1
    }
    streakO.innerHTML = countero
    streakX.innerHTML = counterx
}

