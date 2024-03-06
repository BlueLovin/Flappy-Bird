export default class GameLoop {
  constructor(update, draw) {
    this.update = update;
    this.draw = draw;

    this.idAnimation = this.animation();
  }

  animation() {
    this.idAnimation = requestAnimationFrame(this.animation.bind(this));

    this.update();
    this.draw();
  }

  cancelAnimation() {
    cancelAnimationFrame(this.idAnimation);
  }
}
