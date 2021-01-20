export class Canvas {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext('2d');

        this.pause = true;
        this.first = true;
    }

    render = () => {

    }

    initialRun = () => {
        this.first = false;
        this.render();
    }

    run = () => {
        this.pause = false;

        this.first ? this.initialRun() : null;
    }
}
