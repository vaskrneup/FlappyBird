import {ACCELERATION, GAME_BACKGROUND_IMG_HEIGHT, GAME_BACKGROUND_IMG_WIDTH} from "./constants.js";


export class Bird {
    IMAGE_MAPPER = {
        '0': this.downFlapImage,
        '1': this.midFlapImage,
        '2': this.upFlapImage
    }

    constructor(x, y, acceleration, downFlapImage, midFlapImage, upFlapImage) {
        this.x = x || ~~(GAME_BACKGROUND_IMG_WIDTH / 2);
        this.y = y || ~~(GAME_BACKGROUND_IMG_HEIGHT / 2);
        this.acceleration = acceleration || ACCELERATION;

        this.downFlapImage = downFlapImage;
        this.midFlapImage = midFlapImage;
        this.upFlapImage = upFlapImage;

        this.image = this.midFlapImage;
        this.currentImageIndex = 1;
        this.imageDirection = 1;

        this.speed = 1;
        
        this.animateBird();
    }

    animateBird = () => {
        setInterval(() => {
            if (this.currentImageIndex === 2) this.imageDirection = -1;
            else if (this.currentImageIndex === 0) this.imageDirection = 1;

            this.currentImageIndex += this.imageDirection;
            this.image = this.IMAGE_MAPPER[this.currentImageIndex];
        });
    }

    fly = () => {
        this.speed += this.acceleration;
        this.x -= this.speed;
    }

    fall = () => {
        this.speed += this.acceleration;
        this.x += this.speed;
    }
}
