import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Pipe from "./pipe.js";
import Bird from "./bird.js";
import Score from "./score.js";
import WindowGameOver from "./windowGameOver.js";
import Medal from "./medal.js";
import Config from "./config.js";
import WindowGameStart from "./windowGameStart.js";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.pipe = new Pipe();
    this.bird = new Bird();
    this.score = new Score();
    this.windowGameOver = new WindowGameOver();
    this.medal = new Medal(this.score);
    this.config = new Config();
    this.windowGameStart = new WindowGameStart();

    this.gameLoop = new GameLoop(this.update.bind(this), this.draw.bind(this));
    this.score.localStorageScore();

    this.canvas.element.addEventListener("click", () => {
      this.config.gamePlaying = true;
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.config.gamePlaying = true;
      }
    });

    this.canvas.element.addEventListener("touchstart", () => {
      this.config.gamePlaying = true;
    });
  }

  update() {
    if (this.config.gamePlaying) {
      this.pipe.update(
        this.bird,
        this.gameLoop,
        this.windowGameOver,
        this.score,
        this.medal
      );
      this.bird.update();
    }
  }

  draw() {
    this.canvas.draw();
    this.pipe.draw();
    this.bird.draw();
    if (this.config.gamePlaying) this.score.draw();
    if (!this.config.gamePlaying) this.windowGameStart.draw();
  }
}
new Game();
