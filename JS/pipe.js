import Canvas from "./canvas.js";
import Config from "./config.js";
import RefreshGame from "./gameFeatures.js";

export default class Pipe {
  constructor() {
    this.pipeUp = new Image();
    this.pipeUp.src = "Images/pipeUp.png";

    this.pipeBottom = new Image();
    this.pipeBottom.src = "Images/pipeBottom.png";

    this.canvas = new Canvas();
    this.config = new Config();
    this.refreshGame = new RefreshGame();

    this.newPipeAdded = false;
    this.hasBeenScored = false;

    this.speed = Math.floor(this.canvas.element.width / 250);

    this.gap = 130;
    this.spaceBetweenPipe = this.canvas.element.width / 1.5;
    this.pipes = [
      {
        x: this.canvas.element.width,
        y: 0,
      },
    ];

    this.btnRestart = document.querySelector(".btn-flappy-bird");

    this.birdCollisionPositionY = 485;
  }

  update(bird, gameLoop, windowGameOver, score, medal) {
    this.pipes.forEach((pipe) => {
      pipe.x -= this.speed;
      if (pipe.x < this.spaceBetweenPipe && !pipe.newPipeAdded) {
        this.pipes.push({
          x: this.canvas.element.width,
          y:
            Math.floor(Math.random() * (this.pipeUp.height - 100)) -
            (this.pipeUp.height - 300),
        });
        pipe.newPipeAdded = true;
      }

      if (pipe.x + this.pipeUp.width <= 0) {
        this.pipes.shift();
      }

      if (pipe.x < bird.birdPositionX && !pipe.hasBeenScored) {
        score.increaseScore();
        score.audioScore.play();
        pipe.hasBeenScored = true;
      }

      let scaledForegroundHeight = this.canvas.foreground.height * this.canvas.scaleFactor;

      // Bird edges for collision detection
      let birdBottomEdge = bird.birdPositionY + bird.birdHeight;

      // Adjusting ground collision check for scaled foreground height
      let playableAreaHeight = (this.canvas.element.height - scaledForegroundHeight) / this.canvas.scaleFactor;

      let hitGround = birdBottomEdge >= playableAreaHeight;

      let birdHitsPipeHorizontally = bird.birdPositionX + (bird.birdWidth * this.canvas.scaleFactor) >= pipe.x && bird.birdPositionX <= pipe.x + this.pipeUp.width;
      let birdHitsTopPipeVertically = bird.birdPositionY <= pipe.y - 5 + this.pipeUp.height - 200;
      let birdHitsBottomPipeVertically = bird.birdPositionY + bird.birdHeight >= pipe.y + this.pipeUp.height + this.gap - 200;

      if ((birdHitsPipeHorizontally && (birdHitsTopPipeVertically || birdHitsBottomPipeVertically)) || hitGround) {

        gameLoop.cancelAnimation();

        document.addEventListener("click", () => {
          bird.flyBird.pause();
        });

        document.addEventListener("touchstart", () => {
          bird.flyBird.pause();
        });

        bird.birdPositionY = this.birdCollisionPositionY;
        bird.dieBird.play();

        score.bestScoreRecord();
        windowGameOver.draw(score._score, score._bestScore, medal);
        score._score = "";

        this.btnRestart.classList.add("active");
        this.btnRestart.addEventListener("click", this.refreshGame.restart);

        document.addEventListener("keydown", (event) => {
          if (event.code === 'Space') {
            this.refreshGame.restart();
          }
        });
      }
    });
  }


  draw() {
    // Draw background images continuously and seamlessly
    this.config.index += 0.3;
    this.canvas.backgroundX = -((this.config.index * this.config.speedBackground) % this.canvas.element.width);
    this.canvas.context.drawImage(this.canvas.background, this.canvas.backgroundX, 0, this.canvas.element.width, this.canvas.element.height);
    if (this.canvas.backgroundX < 0) {
      this.canvas.context.drawImage(this.canvas.background, this.canvas.backgroundX + this.canvas.element.width, 0, this.canvas.element.width, this.canvas.element.height);
    }

    // Draw pipes with scaling and correct positioning
    this.pipes.forEach((pipe) => {
      let scaledGap = this.gap * this.canvas.scaleFactor;
      // Adjust the y-position and height based on the scale
      let pipeYPosition = (pipe.y - 200) * this.canvas.scaleFactor; // Example adjustment

      this.canvas.context.drawImage(this.pipeUp, pipe.x, pipeYPosition, this.pipeUp.width * this.canvas.scaleFactor, this.pipeUp.height * this.canvas.scaleFactor);
      this.canvas.context.drawImage(this.pipeBottom, pipe.x, pipeYPosition + this.pipeUp.height * this.canvas.scaleFactor + scaledGap, this.pipeBottom.width * this.canvas.scaleFactor, this.pipeBottom.height * this.canvas.scaleFactor);
    });

    // Draw foreground with scaling and correct positioning to match the dynamic canvas size
    let scaledForegroundHeight = this.canvas.foreground.height * this.canvas.scaleFactor;
    // Position the foreground at the bottom of the canvas, adjusting for its scaled height
    let foregroundYPosition = this.canvas.element.height - scaledForegroundHeight;

    this.canvas.context.drawImage(
      this.canvas.foreground,
      this.canvas.backgroundX,
      foregroundYPosition,
      this.canvas.element.width, // Maintain width to span across the canvas
      scaledForegroundHeight
    );
    // Ensure the foreground seamlessly repeats similar to the background
    if (this.canvas.backgroundX < 0) {
      this.canvas.context.drawImage(
        this.canvas.foreground,
        this.canvas.backgroundX + this.canvas.element.width,
        foregroundYPosition,
        this.canvas.element.width, // Maintain width to span across the canvas
        scaledForegroundHeight
      );
    }
  }

}
