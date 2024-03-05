import Canvas from "./canvas.js";

export default class WindowGameStart {
    constructor() {
        this.canvas = new Canvas()

        this.windowGameStart = new Image()
        this.windowGameStart.src = 'Images/windowGameStart.png'
    }

    draw() {
       this.canvas.context.drawImage(this.windowGameStart, this.canvas.element.width / 2 - this.windowGameStart.width / 2 , 50) 
    }
}