import Canvas from "./canvas.js";

export default class Medal {
    constructor(score) {
        this.canvas = new Canvas()

        this.medalImg = new Image()
        this.medalImg.src = 'Images/medal.png'

        this.medalWidth = 45
        this.medalHeight = 45

        this.medalPositionImgX 
        this.medalPositionImgY 

        this.medalPositionCanvasX = 56
        this.medalPositionCanvasY = 186

        this.score = score
    }

    draw() {
        if (this.score._bestScore > 0 && this.score._bestScore <= 15)  {
            this.medalPositionImgX = 0
            this.medalPositionImgY = 0
        } else if (this.score._bestScore > 15) {
            this.medalPositionImgX = 48
            this.medalPositionImgY = 0
        } else if (this.score._bestScore > 30) {
            this.medalPositionImgX = 0
            this.medalPositionImgY = 45
        } else if(this.score._bestScore > 50) {
            this.medalPositionImgX = 48
            this.medalPositionImgY = 45
        }
        this.canvas.context.drawImage(this.medalImg, this.medalPositionImgX, this.medalPositionImgY, this.medalWidth, this.medalHeight, this.medalPositionCanvasX, this.medalPositionCanvasY, this.medalWidth, this.medalHeight)
    }
}