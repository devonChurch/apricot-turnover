const $ = require('jquery');
const Helper = require('./helper');
const Background = require('./background');

// hue: { base = 340, offset = 30 },
// saturation: { base = 100, offset = 30 },
// luminosity: { base = 50, offset = 0 },
// alpha: { base = 1, offset = 0 }

const Hero = class {

    constructor(properties = {}) {

        this.properties = properties;
        this.height = 800;
        this.width = 2000;
        this.ctx = this.generateCanvas();
        this.Helper = new Helper(this);
        this.Background = new Background(this);

        this.animate();

    }

    generateCanvas() {

        const $canvas = $(`<canvas class="hero" height="${this.height}" width="${this.width}" />`);

        $('body').append($canvas);

        return $canvas[0].getContext('2d');

    }

    animate() {

        this.clearCanvas();
        this.Background.build();

        requestAnimationFrame(() => this.animate());

    }

    clearCanvas() {

        this.ctx.clearRect(0, 0, this.width, this.height);

    }

};

module.exports = Hero;
