import Canvas from "./canvas.js";
import Config from "./config.js";

export default class Bird {
  constructor() {
    this.canvas = new Canvas();
    this.config = new Config();

    this.imageBird = new Image();
    this.imageBird.src = "Images/bird.png";

    this.flyBird = new Audio();
    this.flyBird.src = "audio/fly.wav";

    this.dieBird = new Audio();
    this.dieBird.src = "audio/die.wav";

    this.birdWidth = 35;
    this.birdHeight = 25;
    this.birdJump = 1;

    this.birdX = 0;
    this.birdPositionX = (this.canvas.element.width / 2);

    this.birdY;
    this.birdPositionY = 239;

    this.targetBirdPositionY = this.canvas.height; // Set the initial target position to be the bottom of the screen
    this.lerpRate = 0.3; // Adjust this value to change the speed of the transition
    this.velocityY = 0; // The bird's current vertical velocity
    this.lift = -8; // The force of the jump (negative because it goes up)
    this.maxDownwardsSpeed = 5; // The maximum speed at which the bird can fall
    this.maxUpwardsSpeed = -10; // The maximum speed at which the bird can rise

    this.control();
  }

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  update() {
    // Apply gravity
    this.velocityY += this.config.gravity;
    this.birdPositionY += this.velocityY;

    // Limit speed
    if (this.velocityY > this.maxDownwardsSpeed) {
      this.velocityY = this.maxDownwardsSpeed;
    } else if (this.velocityY < this.maxUpwardsSpeed) {
      this.velocityY = this.maxUpwardsSpeed;
    }

    // Prevent bird from going off the top of the screen
    if (this.birdPositionY < 0) {
      this.birdPositionY = 0;
      this.velocityY = 0;
    }
  }

  draw() {
    this.config.index += 0.3;
    this.birdY = Math.floor((this.config.index % 9) / 3) * (this.birdWidth - 9);

    let scaledBirdWidth = this.birdWidth * this.canvas.scaleFactor;
    let scaledBirdHeight = this.birdHeight * this.canvas.scaleFactor;
    let scaledPositionX = this.birdPositionX
    let scaledPositionY = this.birdPositionY * this.canvas.scaleFactor;

    this.canvas.context.drawImage(
      this.imageBird,
      this.birdX,
      this.birdY,
      this.birdWidth, // Original sprite crop width (if using sprite sheet)
      this.birdHeight, // Original sprite crop height
      scaledPositionX,
      scaledPositionY,
      scaledBirdWidth,
      scaledBirdHeight
    );
  }

  jump() {
    this.velocityY = 0; // Reset the velocity when a jump is initiated
    this.velocityY += this.lift;
    this.flyBird.play();
  }

  control() {
    this.canvas.element.addEventListener("click", () => {
      this.jump();
    });

    this.canvas.element.addEventListener("touchstart", () => {
      this.jump();
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === 'Space') {
        this.jump();
      }
    });
  }
}
