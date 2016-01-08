const $ = require('jquery');
const Helper = require('./helper');
const Background = require('./background');
const Glare = require('./glare');

const Base = class {

    constructor({$wrapper = $('body'), height = 500, width = 1000, background = {}, glare = {}} = {}) {

        this.$wrapper = $wrapper;
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

        // Place the canvas into the DOM inside the stipulated wrapper element
        // or the default location.

        const $canvas = $(`<canvas class="apricot-turnover" height="${this.height}" width="${this.width}" />`);

        this.$wrapper.append($canvas);

        return $canvas;

    }

    animate() {

        // The animation loop the transitions the gradient stops and the glare
        // triangles during the executions lifespan.

        this.clearCanvas();
        this.Background.build();
        this.Glare.animate();

        requestAnimationFrame(() => this.animate());

    }

    clearCanvas() {

        this.ctx.clearRect(0, 0, this.width, this.height);

    }

};

module.exports = Base;
