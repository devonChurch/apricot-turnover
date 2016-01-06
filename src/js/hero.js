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

    constructor({height = 500, width = 1000, background, glare} = {}) {

        this.$wrapper = $('#hero');
        this.height = height;
        this.width = width;
        this.$canvas = this.injectCanvas();
        this.ctx = this.$canvas[0].getContext('2d');
        this.Helper = new Helper(this);
        this.Background = new Background(this, background);
        this.Glare = new Glare(this, glare);
        this.animate();

    }

    injectCanvas() {

        const $canvas = $(`<canvas class="hero__canvas" height="${this.height}" width="${this.width}" />`);

        this.$wrapper.prepend($canvas);

        return $canvas;

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

    // updateCanvas({height = this.height, width = this.width} = {}) {
    //
    //     this.height = height;
    //     this.width = width;
    //
    //     this.$canvas.attr({
    //         height: height,
    //         width: width
    //     });
    //
    // }

};

module.exports = Hero;
