import {PIPE_BOTTOM, PIPE_TOP, CANVAS_HEIGHT} from "./constants.js";

export class Pipe {
    constructor(x, y, top, speed) {
        this.x = x;
        this.y = y;
        this.top = top || true;

        this.speed = speed || 1;
        this.image = top ? PIPE_TOP : PIPE_BOTTOM;

        this.width = this.image.width;
        this.height = this.image.height;

        this.pipeHeight = top ? (this.height + y) : (this.height - this.y);
        this.pipeY = top ? (this.pipeHeight) : y;
    }

    moveLeft = () => {
        this.x -= this.speed;
    }
}