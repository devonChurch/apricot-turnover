const $ = require('jquery');

const Background = class {

    constructor(Hero) {

        this.Hero = Hero;
        this.stops = this.generateStops();

        console.log(this.stops);

    }

    generateStops() {

        const stops = [];

        for (let i = 0; i < 3; i += 1) {

            stops[i] = this.generateStop();
            this.resetX(stops[i], i);

        }

        // for debugging....
        // stops[0].hue = 33;
        // stops[1].hue = 200;
        // stops[2].hue = 130;

        return stops;

    }

    generateStop() {

        const hue = this.randomiseHue();
        const saturation = 100; // Randomise at some stage?
        const luminosity = this.randomiseLuminosity();
        const alpha = 1;  // Randomise at some stage?

        return {hue, saturation, luminosity, alpha};

    }

    build() {

        const ctx = this.Hero.ctx;

        this.updateStops();

        ctx.fillRect(0, 0, this.Hero.width, this.Hero.height);
        ctx.fillStyle = this.createGradient();
        ctx.fill();

    }

    createGradient() {

        const grad = this.Hero.ctx.createLinearGradient(this.Hero.width * -2, 0, this.Hero.width * 3, 0);

        for (let stop of this.stops) {

            const hsl = this.produceHsl(stop);
            grad.addColorStop(stop.x, hsl);

        }

        return grad;

    }

    updateStops() {

        this.transitionStops();

        if (this.stops[2].x >= 1) {

            this.reorderStops();

        }

    }

    reorderStops() {

        const reorder = [];

        for (let i = 0; i < 3; i += 1) {

            const stop = this.stops[i - 1] || this.stops[2];
            reorder[i] = stop;
            this.resetX(reorder[i], i);

        }

        this.stops = reorder;

    }

    resetX(stop, i) {

        const offset = 1 / 3;

        stop.x = i * offset;

    }

    transitionStops() {

        for (let stop of this.stops) {

            stop.x += 0.001;

        }

    }

    produceHsl(p) {

        return `hsla(${p.hue}, ${p.saturation}%, ${p.luminosity}%, ${p.alpha})`;

    }

    randomiseHue() {

        const offset = 25; // += / -= offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});
        let hue = this.Hero.color - offset + randomise;

        if (hue > 360) hue = hue - 360;
        if (hue < 0) hue = 360 - (hue * -1);

        return hue;

    }

    randomiseLuminosity() {

        const offset = 15; // += / -= offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});

        return 50 - offset + randomise;

    }

};

module.exports = Background;
