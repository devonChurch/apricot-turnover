const $ = require('jquery');
const Helper = require('./helper');
const Background = require('./background');
const Glare = require('./glare');

// hue: { base = 340, offset = 30 },
// saturation: { base = 100, offset = 30 },
// luminosity: { base = 50, offset = 0 },
// alpha: { base = 1, offset = 0 }

// this.Glare = [
//     new Glare(this, {
//         anchor: {x: 0, y: this.height}, // x, y
//         horizontal : {min: this.width, max: this.width * 1.5}, // min, max
//         vertical: {min: this.height * -0.5, max: this.height * 0.5} // min, max
//     }),
//     new Glare(this, {
//         anchor: {x: this.width, y: this.height}, // x, y
//         horizontal : {min: 0, max: this.width * 0.5}, // min, max
//         vertical: {min: this.height * 0.75, max: this.height * 0.25} // min, max
//     })
// ];

const Hero = class {

    constructor(properties = {}) {

        this.properties = properties;
        this.$wrapper = $('#hero');
        this.height = 800;
        this.width = 2000;
        this.ctx = this.generateCanvas();
        this.Helper = new Helper(this);
        this.Background = new Background(this);
        this.Glare = new Glare(this);

        this.animate();

    }

    generateCanvas() {

        const $canvas = $(`<canvas class="hero__canvas" height="${this.height}" width="${this.width}" />`);

        this.$wrapper.prepend($canvas);

        return $canvas[0].getContext('2d');

    }

    animate() {

        this.clearCanvas();
        this.Background.build();
        this.Glare.animate();

        requestAnimationFrame(() => this.animate());

    }

    clearCanvas() {

        this.ctx.clearRect(0, 0, this.width, this.height);

    }

};

module.exports = Hero;
