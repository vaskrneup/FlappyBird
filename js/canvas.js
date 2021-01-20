import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants.js";

export class Canvas {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.pause = true;
        this.first = true;
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render = () => {

    }

    _initialRun = () => {
        this.first = false;
        requestAnimationFrame(this.render);
    }

    initialRun = () => {
        this._initialRun();
    }

    _run = () => {
        this.pause = false;
        this.first ? this.initialRun() : null;
    }

    run = () => {
        this._run();
    }
}
