import Canvas from "./canvas.js"

export default class WindowGameOver {
    constructor() {
        this.canvas = new Canvas()

        this.windowGameOver = new Image()
        this.windowGameOverPositionY = 100

        this.PositionX = 200
        this.scorePositionY = 200
        this.bestScorePositionY = 242
    }

    draw(score, bestScore, medal) {
        this.windowGameOver.src = 'Images/windowGameOver.png'

        this.windowGameOver.onload = () => {
            this.canvas.context.drawImage(this.windowGameOver, this.canvas.element.width / 2 - this.windowGameOver.width / 2, this.windowGameOverPositionY)

            medal.draw()

            this.canvas.context.font = '30px Quantico'

            this.canvas.context.fillStyle = 'white'
            this.canvas.context.fillText(score, this.PositionX, this.scorePositionY)

            this.canvas.context.strokeStyle = 'black'
            this.canvas.context.strokeText(score, this.PositionX, this.scorePositionY)

            this.canvas.context.fillStyle = 'white'
            this.canvas.context.fillText(bestScore, this.PositionX, this.bestScorePositionY)

            this.canvas.context.strokeStyle = 'black'
            this.canvas.context.strokeText(bestScore, this.PositionX, this.bestScorePositionY)
        }
    }
}
