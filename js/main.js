import {Canvas} from "./canvas.js";
import {Bird} from "./bird.js";
import {Pipe} from "./obstacle.js";
import {
    BIRD_DOWN_FLAP_IMG,
    BIRD_MID_FLAP_IMG,
    BIRD_UP_FLAP_IMG,
    GAME_BACKGROUND_IMG_WIDTH,
    GAME_BASE_IMG_WIDTH,
    OBSTACLE_PASSABLE_HEIGHT,
    GENERATE_OBSTACLE_PER_UNIT_LENGTH
} from "./constants.js";


class FlappyBird extends Canvas {
    constructor(welcomeScreenId, canvasID, replayScreenId, bird, backgroundId, baseId) {
        super(canvasID);

        this.welcomeScreen = document.getElementById(welcomeScreenId);
        this.replayScreen = document.getElementById(replayScreenId);
        this.background = document.getElementById(backgroundId);
        this.base = document.getElementById(baseId);

        this.bird = bird;

        this.backgroundMovementRate = 0.1;
        this.backgroundPosition = 0;

        this.foregroundMovementRate = 1;
        this.foregroundPosition = 0;

        this.currentScore = 0;
        this.higestScore = localStorage.getItem('flappyBirdHighScore')

        this.activeObstacles = [];
        this.obstacleGenerationLengthCount = GENERATE_OBSTACLE_PER_UNIT_LENGTH;
    }

    generateObstacle = () => {
        if (!this.paused) {
            this.activeObstacles.push(new Pipe(this.width, -100, true, this.foregroundMovementRate));
            this.activeObstacles.push(new Pipe(this.width, 300, false, this.foregroundMovementRate));
        }
    }

    clearObstacle = (obstacle, index) => {
        if (!this.paused) {
            if ((obstacle.x + obstacle.width) <= 0) {
                this.activeObstacles.splice(index, 1);
            }
        }
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
        if (!this.paused) {
            this.backgroundPosition += this.backgroundMovementRate;
            this.background.style.left = (-this.backgroundPosition) + 'px';

            if (this.backgroundPosition >= GAME_BACKGROUND_IMG_WIDTH) this.backgroundPosition = 0;
        }
    }

    animateBase = () => {
        if (!this.paused) {
            this.foregroundPosition += this.foregroundMovementRate;
            this.base.style.left = (-this.foregroundPosition) + 'px';

            if (this.foregroundPosition >= GAME_BASE_IMG_WIDTH) this.foregroundPosition = 0;
        }
    }

    animatePipe = (obstacle) => {
        obstacle.moveLeft();
        obstacle.speed = this.foregroundMovementRate;
        this.ctx.drawImage(obstacle.image, obstacle.x, obstacle.y);
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
            this.obstacleGenerationLengthCount += this.foregroundMovementRate;

            if (this.obstacleGenerationLengthCount >= GENERATE_OBSTACLE_PER_UNIT_LENGTH) {
                this.generateObstacle();
                this.obstacleGenerationLengthCount = 0;
            }

            this.animateBird();
            this.animateBackground();
            this.animateBase();
            this.activeObstacles.forEach((obstacle, index) => {
                this.animatePipe(obstacle);
                this.clearObstacle(obstacle, index);
            });

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