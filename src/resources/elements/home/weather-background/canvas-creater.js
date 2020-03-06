export class CanvasBgCreater {
  constructor(src, canvas, img) {
    this._init(src, canvas, img);
  }

  _init(src, canvas, img) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let width = canvas.width;
    let height = canvas.height;

    this._draw(ctx, img, src, width, height);

  }

  _draw(ctx, img, src, width, height) {
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, width, height);
    });

    img.src = src;
  }
}
