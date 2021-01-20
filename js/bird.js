import {ACCELERATION, GAME_BACKGROUND_IMG_HEIGHT, GAME_BACKGROUND_IMG_WIDTH} from "./constants.js";


export class Bird {
    constructor(x, y, acceleration, downFlapImage, midFlapImage, upFlapImage, jumpLenPerClick) {
        this.x = x || ~~(GAME_BACKGROUND_IMG_WIDTH / 2);
        this.y = y || ~~(GAME_BACKGROUND_IMG_HEIGHT / 2);
        this.acceleration = acceleration || ACCELERATION;

        this.downFlapImage = downFlapImage;
        this.midFlapImage = midFlapImage;
        this.upFlapImage = upFlapImage;

        this.image = this.midFlapImage;
        this.currentImageIndex = 1;
        this.imageDirection = 1;

        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;

        this.speed = 1;

        this.IMAGE_MAPPER = {
            '0': this.downFlapImage,
            '1': this.midFlapImage,
            '2': this.upFlapImage
        }

        this.fallRate = 1;
        this.falling = true;

        this.jumpCount = 0;
        this.jumpLenPerClick = jumpLenPerClick || 20;

        this.animateBird();
    }

    animateBird = () => {
        setInterval(() => {
            if (this.currentImageIndex === 2) this.imageDirection = -1;
            else if (this.currentImageIndex === 0) this.imageDirection = 1;

            this.currentImageIndex += this.imageDirection;
            this.image = this.IMAGE_MAPPER[this.currentImageIndex];
        }, 500);
    }

    fly = () => {
        let jumpCount = 0;
        this.falling = false;

        const jump = setInterval(() => {
            this.fallRate = 1;
            this.y -= 1;
            jumpCount++;

            if (jumpCount >= this.jumpLenPerClick) {
                clearInterval(jump);
                this.falling = true;
            }
        }, 16.67)
    }

    fall = () => {
        if (this.falling) {
            this.fallRate += this.acceleration;
            this.y += this.fallRate;
        }
        requestAnimationFrame(this.fall);
    }
}
