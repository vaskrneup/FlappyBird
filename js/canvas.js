export class Canvas {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext('2d');

        this.pause = true;
        this.first = true;
    }

    render = () => {

    }

    _initialRun = () => {
        this.first = false;
        this.render();
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
