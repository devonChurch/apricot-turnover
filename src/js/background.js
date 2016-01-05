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
        const saturation = this.randomiseSaturation();
        const luminosity = this.randomiseLuminosity();
        const alpha = this.randomiseAlpha();

        return {hue, saturation, luminosity, alpha};

    }

    build() {

        const ctx = this.Hero.ctx;

        this.updateStops();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(0, 0, this.Hero.width, this.Hero.height);
        ctx.fillStyle = this.createGradient();
        ctx.fill();
        ctx.closePath();

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

            const stop = this.stops[i - 1] || this.generateStop();
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

        const properties = this.Hero.properties.hue || {};
        const base = properties.base || 340;
        const offset = properties.offset || 25; // +/- offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});
        let hue = base - offset + randomise;

        if (hue > 360) hue = hue - 360;
        if (hue < 0) hue = 360 - (hue * -1);

        return hue;

    }

    randomiseSaturation() {

        const properties = this.Hero.properties.saturation || {};
        const base = properties.base || 90;
        const offset = properties.offset || 10; // +/- offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});

        let saturation = base - offset + randomise;

        if (saturation > 100) saturation = 100;
        if (saturation < 0) saturation = 0;

        return saturation;

    }

    randomiseLuminosity() {

        const properties = this.Hero.properties.luminosity || {};
        const base = properties.base || 50;
        const offset = properties.offset || 0; // +/- offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});

        let luminosity = base - offset + randomise;

        if (luminosity > 100) luminosity = 100;
        if (luminosity < 0) luminosity = 0;

        return luminosity;

    }

    randomiseAlpha() {

        const properties = this.Hero.properties.alpha || {};
        const base = properties.base || 1;
        const offset = properties.offset || 0; // +/- offset
        const max = offset * 2;
        const randomise = this.Hero.Helper.randomise({max});

        let alpha = base - offset + randomise;

        if (alpha > 1) alpha = 1;
        if (alpha < 0) alpha = 0;

        return alpha;

    }

};

module.exports = Background;
