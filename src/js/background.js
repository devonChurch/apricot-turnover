const $ = require('jquery');

const Background = class {

    constructor(Hero) {

        this.Hero = Hero;
        this.width = this.Hero.width * 2;
        this.x = this.resetX;
        this.stops = this.generateStops();

        console.log(this.stops);

    }

    generateStops() {

        const stops = [];

        for (let i = 0; i < 3; i += 1) {

            stops[i] = this.generateStop();

        }

        return stops;

    }

    generateStop() {

        const hue = this.randomiseHue();
        const saturation = 50; // Randomise at some stage?
        const luminosity = 50; // Randomise at some stage?
        const alpha = 1;  // Randomise at some stage?

        return {hue, saturation, luminosity, alpha};

    }

    build() {

        console.log(`x = ${this.x}`);

        // move the rect
        // if the rect has hit x = 0;
        //  - then we need to update the color stops

        const ctx = this.Hero.ctx;
        const reset = this.updateX();
        // const stops = reset ? 'xxx' : this.stops;

        ctx.beginPath();
        ctx.rect(this.x, 0, this.width, this.Hero.height);
        ctx.fillStyle = this.createGradient();
        ctx.fill();

    }

    createGradient() {

        const stops = this.stops;
        const grad = this.Hero.ctx.createLinearGradient(0, 0, this.width, 0);

        for (let i = 0; i < 3; i += 1) {

            const hsl = this.produceHsl(stops[i]);
            grad.addColorStop(i * 0.5, hsl);

        }

        return grad;

    }

    updateStops() {


    }

    updateX() {

        // let x = this.x + 10;
        // const reset = 0 < x;
        // this.x = reset ? this.resetX : x;
        //
        // return reset;

        this.x += 10;

    }

    get resetX() {

        return this.Hero.width * -1;

    }

    produceHsl(p) {

        return `hsla(${p.hue}, ${p.saturation}%, ${p.luminosity}%, ${p.alpha})`;

    }

    randomiseHue() {

        const offset = 50;
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});
        let hue = this.Hero.color - offset + randomise;

        if (hue > 360) hue = hue - 360;
        if (hue < 0) hue = 360 - (hue * -1);

        return hue;

    }

};

module.exports = Background;
