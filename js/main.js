import {Canvas} from "./canvas.js";
import {Bird} from "./bird.js";
import {Pipe} from "./obstacle.js";
import {random} from "./utils.js";
import {
    BIRD_DOWN_FLAP_IMG,
    BIRD_MID_FLAP_IMG,
    BIRD_UP_FLAP_IMG,
    GAME_BACKGROUND_IMG_WIDTH,
    GAME_BASE_IMG_WIDTH,
    OBSTACLE_PASSABLE_HEIGHT,
    GENERATE_OBSTACLE_PER_UNIT_LENGTH, OBSTACLE_RANGE
} from "./constants.js";

// BETTER ALGO FOR CREATING OBSTACLES !!
// FLUID JUMPS !!

class FlappyBird extends Canvas {
    constructor(gameContainerId, bird, actionKeyCode) {
        super(document.getElementById(gameContainerId).querySelector('.canvas'));

        this.gameContainer = document.getElementById(gameContainerId);
        this.actionKeyCode = actionKeyCode;

        this.welcomeScreen = this.gameContainer.querySelector('.welcome-screen');
        this.replayScreen = this.gameContainer.querySelector('.game-over-screen');
        this.background = this.gameContainer.querySelector('.game-background');
        this.base = this.gameContainer.querySelector('.game-ground');
        this.currentScoreDOM = this.gameContainer.querySelector('.current-score');
        this.highestScoreDOM = this.gameContainer.querySelector('.highest-score');


        this.bird = bird || new Bird(null, null, null, BIRD_DOWN_FLAP_IMG, BIRD_MID_FLAP_IMG, BIRD_UP_FLAP_IMG);

        this.backgroundMovementRate = 0.1;
        this.backgroundPosition = 0;

        this.foregroundMovementRate = 1;
        this.foregroundPosition = 0;

        this.currentScore = 0;
        this.higestScore = +localStorage.getItem('flappyBirdHighScore') || 0;

        this.activeObstacles = [];
        this.obstacleGenerationLengthCount = GENERATE_OBSTACLE_PER_UNIT_LENGTH;
        this.hasGeneratedNewObstacle = false;
        this.lastObstacleYPosition = 200;
    }

    reset = () => {
        this.bird.play();
        this.bird.reset();

        this.backgroundMovementRate = 0.1;
        this.backgroundPosition = 0;

        this.foregroundMovementRate = 1;
        this.foregroundPosition = 0;

        this.currentScore = 0;

        this.activeObstacles = [];
        this.obstacleGenerationLengthCount = GENERATE_OBSTACLE_PER_UNIT_LENGTH;
        this.hasGeneratedNewObstacle = false;
    }

    generateObstacle = () => {
        if (!this.paused) {
            let obstacleYValue = random.randInt(this.lastObstacleYPosition - OBSTACLE_RANGE / 2, this.lastObstacleYPosition + OBSTACLE_RANGE / 2);
            obstacleYValue = obstacleYValue < 100 ? random.randInt(100, 200) : obstacleYValue;
            obstacleYValue = obstacleYValue > this.height - 100 ? random.randInt(this.height - 100, this.height - 200) : obstacleYValue;

            this.lastObstacleYPosition = obstacleYValue;

            const topObstacle = new Pipe(this.width, -obstacleYValue, true, this.foregroundMovementRate);

            // console.log(topObstacle.pipeY)
            this.activeObstacles.push({
                top: topObstacle,
                bottom: new Pipe(this.width, -obstacleYValue + topObstacle.height + OBSTACLE_PASSABLE_HEIGHT, false, this.foregroundMovementRate)
            });

            this.hasGeneratedNewObstacle = true;
        }
    }

    clearObstacle = (obstacle, index) => {
        if (!this.paused) {
            if ((obstacle.top.x + obstacle.top.width) <= 0) {
                this.activeObstacles.splice(index, 1);
            }
        }
    }

    onKeyPress = (e) => {
        switch (e.code) {
            case (this.actionKeyCode): {
                this.bird.fly();
            }
        }
    }

    addEventListeners = () => {
        document.addEventListener('keypress', this.onKeyPress);
    }

    handleReplay = (e) => {
        if (e.code === this.actionKeyCode) {
            this.replayScreen.style.display = 'none';

            this.reset();
            this.run();
            document.removeEventListener('keypress', this.handleReplay);
        }
    }

    handleGameOver = () => {
        this.pause()
        this.bird.pause();

        this.replayScreen.style.display = 'block';

        document.addEventListener('keypress', this.handleReplay);

        if (this.currentScore > this.higestScore) {
            localStorage.setItem('flappyBirdHighScore', this.currentScore);
            this.higestScore = this.currentScore;
            this.replayScreen.querySelector('.broke-high-score').style.display = 'block';
        }
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
        obstacle.top.moveLeft();
        obstacle.bottom.moveLeft();

        obstacle.top.speed = this.foregroundMovementRate;
        obstacle.bottom.speed = this.foregroundMovementRate;

        this.ctx.drawImage(obstacle.top.image, obstacle.top.x, obstacle.top.y);
        this.ctx.drawImage(obstacle.bottom.image, obstacle.bottom.x, obstacle.bottom.y);
    }

    animateBird = () => {
        this.ctx.drawImage(this.bird.image, this.bird.x, this.bird.y);
    }

    checkCollision = () => {
        if ((this.bird.y <= 0) || (this.bird.y + this.bird.height) >= this.height) this.handleGameOver();
    }

    checkCollisionWithObstacle = (obstacle) => {
        const topObstacle = obstacle.top;
        const bottomObstacle = obstacle.bottom;

        const hasTouchedInXAxis = (
            ((this.bird.x + this.bird.width) >= topObstacle.x) && (this.bird.x <= (topObstacle.x + topObstacle.width))
        );
        const hasTouchedInYAxisOfTopObstacle = (this.bird.y <= topObstacle.pipeY);
        const hasTouchedYAxisOfBottomObstacle = ((this.bird.y + this.bird.height) >= bottomObstacle.pipeY);

        if (hasTouchedInXAxis && (hasTouchedInYAxisOfTopObstacle || hasTouchedYAxisOfBottomObstacle)) this.handleGameOver();

        // TODO: BETTER ALGO FOR CALCULATING POINTS !!
        if (this.activeObstacles.length === 3 && this.hasGeneratedNewObstacle) {
            this.currentScore++;
            this.currentScoreDOM.innerHTML = this.currentScore;
            this.hasGeneratedNewObstacle = false;

            // this.foregroundMovementRate += 0.1;
            // this.backgroundMovementRate += 0.1;
        }
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
                this.checkCollisionWithObstacle(obstacle);
            });

            this.checkCollision();
        }

        requestAnimationFrame(this.render);
    }

    initialRun = () => {
        this.welcomeScreen.style.display = 'none';
        this.highestScoreDOM.style.display = 'none';
        this.currentScoreDOM.style.display = 'block';

        this.bird.fall();

        this.addEventListeners();
        this._initialRun();
    }

    run = () => {
        this.replayScreen.querySelector('.broke-high-score').style.display = 'none';
        this.currentScoreDOM.innerHTML = this.currentScore;
        this._run();
    }

    runFlappyBird = (e) => {
        if (e.code === this.actionKeyCode) {
            this.run();
            document.removeEventListener('keypress', this.runFlappyBird);
        }
    }

    init = () => {
        if (this.actionKeyCode !== 'Space') {
            this.gameContainer.querySelectorAll('.key-bind').forEach(element => {
                element.innerHTML = element.innerHTML.replace('SPACE', this.actionKeyCode.toUpperCase());
            });
        }

        document.addEventListener('keypress', this.runFlappyBird);
    }

    pause = () => this.paused = true;

    play = () => this.paused = false;
}

function main() {
    // document.getElementById('high-score').innerText = +localStorage.getItem('flappyBirdHighScore') || '0';
    const flappyBird = new FlappyBird(
        'first-game', null, 'Enter'
    );
    flappyBird.init();
}

main();
