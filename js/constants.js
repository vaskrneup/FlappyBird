export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 400;

export const PIPE_BOTTOM = new Image();
PIPE_BOTTOM.src = 'assets/images/pipe/pipe-green.png';
export const PIPE_TOP = new Image();
PIPE_TOP.src = 'assets/images/pipe/pipe-green-top.png';

export const OBSTACLE_PASSABLE_HEIGHT = 100;
export const GENERATE_OBSTACLE_PER_UNIT_LENGTH = 200;

export const OBSTACLE_RANGE = 260;

export const GAME_BACKGROUND_IMG_WIDTH = 288;
export const GAME_BACKGROUND_IMG_HEIGHT = 512;

export const GAME_BASE_IMG_WIDTH = 336;
export const GAME_BASE_IMG_HEIGHT = 112;

export const BIRD_DOWN_FLAP_IMG = new Image();
BIRD_DOWN_FLAP_IMG.src = 'assets/images/bird/bluebird-downflap.png';

export const BIRD_UP_FLAP_IMG = new Image();
BIRD_UP_FLAP_IMG.src = 'assets/images/bird/bluebird-midflap.png';

export const BIRD_MID_FLAP_IMG = new Image();
BIRD_MID_FLAP_IMG.src = 'assets/images/bird/bluebird-upflap.png';

export const ACCELERATION = 0.3;


export const GAME_HTML_TEMPLATE = `
<div class="game-background"></div>
<div class="game-ground"></div>

<div class="screen welcome-screen">
    <div class="welcome-message-container">
        <img src="assets/images/infoGraphics/message.png" alt="Welcome Image">
        <h3 class="start-game-message key-bind">Press 'SPACE' key to start the game</h3>
    </div>

    <p class="game-info key-bind">
        Go past as many obstacle as possible, press 'SPACE' key to jump.
    </p>
</div>

<canvas class="canvas"></canvas>

<div class="screen game-over-screen">
    <div class="welcome-message-container">
        <img src="assets/images/infoGraphics/gameover.png" alt="Welcome Image">
        <h3 class="start-game-message play-again-message key-bind">Press 'SPACE' key to play again</h3>

        <h3 class="broke-high-score">
            🎉🎉
            <br>
            High Score !!!
        </h3>
    </div>

    <p class="game-info key-bind">
        Go past as many obstacle as possible, press 'SPACE' key to jump.
    </p>
</div>

<h3 class="display-score current-score">0</h3>
<h3 class="display-score highest-score">0</h3>
`
