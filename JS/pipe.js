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

    this.gap = 130;
    this.spaceBetweenPipe = 5;
    this.pipe = [
      {
        x: 1.5 * this.canvas.element.width,
        y: 0,
      },
    ];

    this.btnRestart = document.querySelector(".btn-flappy-bird");

    this.birdCollisionPositionY = 485;
  }

  update(bird, gameLoop, windowGameOver, score, medal) {
    this.pipe.forEach((pipe) => {
      pipe.x--;

      if (pipe.x === this.spaceBetweenPipe) {
        this.pipe.push({
          x: this.canvas.element.width,
          y:
            Math.floor(Math.random() * (this.pipeUp.height - 100) /* -120 */) -
            (this.pipeUp.height - 300),
        });
      }

      if (pipe.x + this.pipeUp.width <= 0) {
        this.pipe.shift();
      }

      if (pipe.x === 125) {
        score.increaseScore();
        score.audioScore.play();
      }

      if (
        (bird.birdPositionX + bird.birdWidth >= pipe.x &&
          bird.birdPositionX <= pipe.x + this.pipeUp.width &&
          (bird.birdPositionY <= pipe.y - 5 + this.pipeUp.height - 200 ||
            bird.birdPositionY + bird.birdHeight >=
            pipe.y + this.pipeUp.height + this.gap - 200)) ||
        bird.birdPositionY + bird.birdHeight >=
        this.canvas.element.height - this.canvas.foreground.height
      ) {
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
          if (event.KeyboardEvent.keyCode === 32) {
            this.refreshGame.restart();
          }
        });
      }
    });
  }

  draw() {
    this.pipe.forEach((pipe) => {
      this.canvas.context.drawImage(this.pipeUp, pipe.x, pipe.y - 200);
      this.canvas.context.drawImage(
        this.pipeBottom,
        pipe.x,
        pipe.y - 200 + this.pipeUp.height + this.gap
      );
    });

    this.config.index += 0.3;
    this.canvas.backgroundX = -(
      (this.config.index * this.config.speedBackground) %
      this.canvas.element.width
    );

    this.canvas.context.drawImage(
      this.canvas.foreground,
      this.canvas.backgroundX,
      this.canvas.background.height
    );
    this.canvas.context.drawImage(
      this.canvas.foreground,
      this.canvas.backgroundX + this.canvas.element.width,
      this.canvas.background.height
    );
  }
}
