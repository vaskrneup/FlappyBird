import {Canvas} from "./canvas.js";
import {Bird} from "./bird.js";
import {BIRD_DOWN_FLAP_IMG, BIRD_MID_FLAP_IMG, BIRD_UP_FLAP_IMG} from "./constants.js";


class FlappyBird extends Canvas {
    constructor(welcomeScreenId, canvasID, replayScreenId, bird, backgroundId, baseId) {
        super(canvasID);

        this.welcomeScreen = document.getElementById(welcomeScreenId);
        this.replayScreen = document.getElementById(replayScreenId);
        this.background = document.getElementById(backgroundId);
        this.base = document.getElementById(baseId);

        this.bird = bird;

        this.currentScore = 0;
        this.higestScore = localStorage.getItem('flappyBirdHighScore')
    }

    onKeyPress = (e) => {
        switch (e.code) {
            case ('Space'): {
                this.bird.fly();
            }
        }
    }

    addEventListeners = () => {
        document.addEventListener('keypress', this.onKeyPress);
    }

    handleGameOver = () => {
        this.pause()
    }

    animateBackground = () => {

    }

    animateBase = () => {

    }

    animateBird = () => {
        this.ctx.drawImage(this.bird.image, this.bird.x, this.bird.y);
    }

    checkCollision = () => {
        if ((this.bird.y <= 0) || (this.bird.y + this.bird.height) >= this.height) this.handleGameOver();
    }

    render = () => {
        if (!this.paused) {
            this.clearCanvas();

            this.animateBird();
            this.checkCollision();
        }

        requestAnimationFrame(this.render);
    }

    initialRun = () => {
        this.welcomeScreen.style.display = 'none';

        this.bird.fall();

        this.addEventListeners();
        this._initialRun();
    }

    pause = () => this.paused = true;

    play = () => this.paused = false;
}

function runFlappyBird(e) {
    if (e.code === 'Space') {
        const bird = new Bird(null, null, null, BIRD_DOWN_FLAP_IMG, BIRD_MID_FLAP_IMG, BIRD_UP_FLAP_IMG);
        const flappyBird = new FlappyBird('welcome-screen', 'game-canvas', '', bird, 'game-background', 'game-ground');

        flappyBird.run();
        document.removeEventListener('keypress', runFlappyBird);
    }
}

function main() {
    document.addEventListener('keypress', runFlappyBird);
}

main();