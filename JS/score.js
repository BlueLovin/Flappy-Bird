import Canvas from "./canvas.js"

export default class Score {
    constructor() {
        this.canvas = new Canvas()

        this._score = 0
        this._bestScore = 0

        this.positionX
        this.positionY = 100

        this.audioScore = new Audio()
        this.audioScore.src = 'audio/score.wav'
    }

    increaseScore() {
        this._score++
    }

    bestScoreRecord() {
        if (this._score > this._bestScore) {
            localStorage.setItem('bestScore', this._score)
        }
        this._bestScore = Number(localStorage.getItem('bestScore'))
    }

    localStorageScore() {
        if (localStorage.getItem('bestScore')) {
            this._bestScore = Number(localStorage.getItem('bestScore'))
        } else {
            this._bestScore = 0
        }
    }

    draw() {
        if (this._score < 10) {
            this.positionX = this.canvas.element.width / 2 - 15
        } else {
            this.positionX = this.canvas.element.width / 2 - 25
        }

        this.canvas.context.font = '50px Quantico'

        this.canvas.context.fillStyle = 'white'
        this.canvas.context.fillText(this._score, this.positionX, this.positionY)

        this.canvas.context.strokeStyle = 'black'
        this.canvas.context.strokeText(this._score, this.positionX, this.positionY)
    }
}