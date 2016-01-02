const $ = require('jquery');
const Helper = require('./helper');
const Background = require('./background');

const Hero = class {

    // build canvas
    // get color
    // create...
    //  - base
    //  - light  ???
    //  - dark   ???
    // animate (requetAnimationFrame)

    constructor({color = 340} = {}) {

        this.color = color;
        this.height = 500;
        this.width = 1000;
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

        console.log('clear');

        this.ctx.clearRect(0, 0, this.width, this.height);

    }

};

module.exports = Hero;
