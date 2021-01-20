import {
    ACCELERATION,
    GAME_BACKGROUND_IMG_HEIGHT,
    GAME_BACKGROUND_IMG_WIDTH,
    BIRD_MID_FLAP_IMG,
    BIRD_DOWN_FLAP_IMG, BIRD_UP_FLAP_IMG
} from "./constants.js";


export class Bird {
    constructor(x, y, acceleration, downFlapImage, midFlapImage, upFlapImage, jumpLenPerClick) {
        this.x = x || ~~(GAME_BACKGROUND_IMG_WIDTH / 6);
        this.y = y || ~~(GAME_BACKGROUND_IMG_HEIGHT / 2);
        this.acceleration = acceleration || ACCELERATION;

        this.downFlapImage = downFlapImage || BIRD_DOWN_FLAP_IMG;
        this.midFlapImage = midFlapImage || BIRD_MID_FLAP_IMG;
        this.upFlapImage = upFlapImage || BIRD_UP_FLAP_IMG;

        this.image = this.midFlapImage;
        this.currentImageIndex = 1;
        this.imageDirection = 1;

        this.width = this.image.width;
        this.height = this.image.height;

        this.speed = 1;

        this.IMAGE_MAPPER = {
            '0': this.downFlapImage,
            '1': this.midFlapImage,
            '2': this.upFlapImage
        }

        this.fallRate = 1;
        this.falling = true;

        this.jumpLenPerClick = jumpLenPerClick || 30;

        this.paused = false;

        this.animateBird();
    }

    animateBird = () => {
        setInterval(() => {
            if (!this.paused) {
                if (this.currentImageIndex === 2) this.imageDirection = -1;
                else if (this.currentImageIndex === 0) this.imageDirection = 1;

                this.currentImageIndex += this.imageDirection;
                this.image = this.IMAGE_MAPPER[this.currentImageIndex];
            }
        }, 500);
    }

    fly = () => {
        let jumpCount = 0;
        this.falling = false;

        const animateBirdGoingUpward = () => {
            if (!this.paused) {
                this.fallRate = 1;
                this.y -= 1;
                jumpCount++;

                if (jumpCount >= this.jumpLenPerClick) {
                    cancelAnimationFrame(animateBirdId);
                    this.falling = true;
                } else {
                    animateBirdId = requestAnimationFrame(animateBirdGoingUpward);
                }
            }
        }

        let animateBirdId = requestAnimationFrame(animateBirdGoingUpward);
    }

    fall = () => {
        if (!this.paused) {
            if (this.falling) {
                this.fallRate += this.acceleration;
                this.y += this.fallRate;
            }
        }
        requestAnimationFrame(this.fall);
    }

    pause = () => this.paused = true;

    play = () => this.paused = false;
}
