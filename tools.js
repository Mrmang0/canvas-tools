class CanvaTools {
  constructor() {}

  setCanvasSize = (height, width, canvas = this.canvas) => {
    canvas.width = width;
    canvas.height = height;
  };

  getCanvasById = (canvasId = "canvas") => {
    if (document) {
      this.canvas = document.getElementById(canvasId);
      return this.canvas;
    }
  };

  getContext = () => {
    this.context = this.canvas.getContext("2d");
    return this.context;
  };

  rotateAroundCenter = (point, center, angle) => {
    return {
      x:
        point.x +
        (point.x - center.x) * Math.cos(angle) -
        (point.y - center.y) * Math.sin(angle),
      y:
        center.y +
        (point.y - center.y) * Math.cos(angle) +
        (point.x - center.x) * Math.sin(angle)
    };
  };

  random = range => {
    return Math.random() * range;
  };

  random = (from, range) => {
    return Math.random() * (range - from) + from;
  };

  getRGBA = (r, g, b, a) => {
    return `${r},${g},${b},${a}`;
  };

  saveRestoreBlock = (func, context = this.context) => {
    context.save();
    func(context);
    context.restore();
  };

  beginEndPath = (func, context = this.context) => {
    context.beginPath();
    func(context);
    context.closePath();
  };

  downlaod = (canvas, delay) => {
    setTimeout(() => {
      const btn = document.createElement("a");
      btn.href = canvas.toDataURL("image/png");
      btn.download = "savedPicture";
      btn.dispatchEvent(new MouseEvent("click"));
    }, delay);
  };
}

class IterableFunction {
  constructor(repeatableFunction, iterableFunction, stopCondition, ...args) {
    this.repeatableFunction = repeatableFunction;
    this.iterableFunction = iterableFunction;
    this.stopCondition = stopCondition;
    this.args = args;
  }

  execute = () => this.repeatableFunction(...this.args);

  checkStopCondition = () => this.stopCondition(...this.args);

  increase() {
    this.args = this.iterableFunction(...this.args);
    return this.args;
  }
}

class LoopManager {
  constructor(...iterableFunctions) {
    this.functions = iterableFunctions;
    this.isStopped = false;
  }

  addFunction = func => this.functions.push(func);

  removeFunction = func => this.functions.splice(this.functions.indexOf(func));

  start = () => this.loop();

  stop = () => (this.isStopped = true);

  loop() {
    if (this.isStopped) return;

    this.functions = this.functions.filter(func => {
      const isStopped = func.checkStopCondition();
      if (isStopped) return !isStopped;
      func.execute();
      return true;
    });
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }
}

const _ = new CanvaTools();
