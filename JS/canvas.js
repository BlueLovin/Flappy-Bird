import Config from "./config.js";

export default class Canvas {
  constructor() {
    this.element = document.getElementById("flappy-bird");
    this.context = this.element.getContext("2d");

    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
    this.originalHeight = 630; // Original design height
    this.originalWidth = 288; // Original design height
    this.scaleFactor = this.element.height / this.originalHeight; // Scale to fit the screen

    this.background = new Image();
    this.background.src = "Images/background.png";

    this.foreground = new Image();
    this.foreground.src = "Images/foreground.png";

    this.backgroundX = 0;
    this.backgroundY = 0;

    this.config = new Config();
  }

  draw() {
    this.backgroundX = -(
      (this.config.index * this.config.speedBackground) %
      this.element.width
    );

    this.context.drawImage(this.background, this.backgroundX, this.backgroundY);
    this.context.drawImage(
      this.background,
      this.backgroundX + this.element.width,
      this.backgroundY
    );
  }
}
