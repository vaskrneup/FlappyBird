import {Canvas} from "./canvas.js";
import {Bird} from "./bird.js";


class FlappyBird extends Canvas {
    constructor(welcomeScreenId, canvasID, replayScreenId, bird, backgroundId, baseId) {
        super(canvasID);

        this.welcomeScreen = document.getElementById(welcomeScreenId);
        this.replayScreen = document.getElementById(replayScreenId);
        this.background = document.getElementById(backgroundId);
        this.base = document.getElementById(baseId);

        this.bird = bird;
    }

    animateBackground = () => {

    }

    animateBase = () => {

    }

    render() {

    }

    initialRun = () => {
        this.welcomeScreen.style.display = 'none';
        this._initialRun();
    }
}

function main() {
    const flappyBird = new FlappyBird('welcome-screen', 'game-canvas');

    document.addEventListener('keypress', (e) => {
        if (e.code === 'Space') {
            flappyBird.run();
        }
    })
}

main();