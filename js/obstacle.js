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

        if (top) {
            this.pipeHeight = this.height - y;
        } else {
            this.pipeHeight = CANVAS_HEIGHT - this.height
        }
    }

    moveLeft = () => {
        this.x -= this.speed;
    }
}