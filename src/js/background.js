const $ = require('jquery');

const Background = class {

    // 0 ------------> 1 ------------> 2 ------------->
    //
    // *---------------*---------------*---------------*
    // |  Hidden Left  |  Canvas Area  |  Hidden Right |
    // *---------------*---------------*---------------*
    //
    // The background of the canvas is depicted by a gradient travelling
    // horizontally from left to right. The gradient is made up of 3 color stops
    // with the distance between two stops equaling the width of the canvas
    // (this makes the gradient 3x of the canvas width).
    //
    // During the animation the gradient itself does not travel at all - instead
    // we offset each color stop between the 0 —> 1 offset span. i.e color stop...
    // zero travels 0 —> 0.33
    // one travels 0.33 —> 0.66
    // two travels 0.66 —> 1.
    //
    // Once the color stops reach the end of their max offset they transfer
    // their values to the next color stop with the end stop (#2) moving down to
    // the (#0) color stop allocation (and generates a new random color). This
    // creates the infinite loop.

    constructor(Base, properties) {

        this.Base = Base;
        this.properties = properties;
        this.speed = this.calculateSpeed();
        console.log(this.speed);
        this.stops = this.generateStops();

    }

    generateStops() {

        // Build out the initial three random stop values (#0, #1, #2),

        const stops = [];

        for (let i = 0; i < 3; i += 1) {

            stops[i] = this.generateStop();
            this.resetX(stops[i], i);

        }

        return stops;

    }

    generateStop() {

        // Randomises a hsla color based on the given parameters on
        // initialisation.

        const hue = this.randomiseHue();
        const saturation = this.randomiseSaturation();
        const luminosity = this.randomiseLuminosity();
        const alpha = this.randomiseAlpha();

        return {hue, saturation, luminosity, alpha};

    }

    build() {

        // Builds the gradient with its persistent values kept throughout the
        // animation and injects it onto the canvas.

        const ctx = this.Base.ctx;

        this.updateStops();

        // Resets the blends mode to default.
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.rect(0, 0, this.Base.width, this.Base.height);
        ctx.fillStyle = this.createGradient();
        ctx.fill();
        ctx.closePath();

    }

    createGradient() {

        // Builds out the gradients color stops with their current x offset and
        // centres the gradient on the canvas.

        const grad = this.Base.ctx.createLinearGradient(this.Base.width * -2, 0, this.Base.width * 3, 0);

        for (let stop of this.stops) {

            const hsl = this.produceHsl(stop);
            grad.addColorStop(stop.x, hsl);

        }

        return grad;

    }

    updateStops() {

        // Checks to see if the last stop in the gradient sequence (stop #2) has
        // reached its max value (1.0) and if so then we need to loop the stops
        // to continue gradient transition.

        this.transitionStops();

        if (this.stops[2].x >= 1) {

            this.reorderStops();

        }

    }

    reorderStops() {

        // Moves all color stops in the gradient forward one spot and resetting
        // the old last stop (#2) to be the new first (#0).

        const reorder = [];

        for (let i = 0; i < 3; i += 1) {

            const stop = this.stops[i - 1] || this.generateStop();
            reorder[i] = stop;
            this.resetX(reorder[i], i);

        }

        this.stops = reorder;

    }

    resetX(stop, i) {

        // Gives each of the three color stops its initial starting point for
        // the animation.

        const offset = 1 / 3;

        stop.x = i * offset;

    }

    calculateSpeed() {

        // We take the users percentage based speed value and generate a
        // reference that relates to the color stop offset for a canvas gradient.

        const speed = this.properties.speed || 100;

        return this.Base.Helper.findPercentage({percentage: speed, of: 0.001});

    }

    transitionStops() {

        // Move the gradient stops forward each animation tick.

        for (let stop of this.stops) {

            stop.x += this.speed;

        }

    }

    produceHsl(p) {

        // Turns the current hsla properties into a usable value.

        return `hsla(${p.hue}, ${p.saturation}%, ${p.luminosity}%, ${p.alpha})`;

    }

    // The following randomise functions create the random aspects of the hsla
    // properties either passed in by the user or from the default fallback
    // values.

    randomiseHue() {

        const properties = this.properties.hue || {};
        const base = properties.base || 340;
        const offset = properties.offset || 50; // +/- offset
        const max = offset * 2;
        const randomise = this.Base.Helper.randomise({max});
        let hue = base - offset + randomise;

        // Note: we do not put a hard stop to the min and max values - instead
        // we loop back around and the hue scale is seamless.

        if (hue > 360) hue = hue - 360;
        if (hue < 0) hue = 360 - (hue * -1);

        return hue;

    }

    randomiseSaturation() {

        const properties = this.properties.saturation || {};
        const base = properties.base || 80;
        const offset = properties.offset || 20; // +/- offset
        const max = offset * 2;
        const randomise = this.Base.Helper.randomise({max});

        let saturation = base - offset + randomise;

        if (saturation > 100) saturation = 100;
        if (saturation < 0) saturation = 0;

        return saturation;

    }

    randomiseLuminosity() {

        const properties = this.properties.luminosity || {};
        const base = properties.base || 50;
        const offset = properties.offset || 10; // +/- offset
        const max = offset * 2;
        const randomise = this.Base.Helper.randomise({max});

        let luminosity = base - offset + randomise;

        if (luminosity > 100) luminosity = 100;
        if (luminosity < 0) luminosity = 0;

        return luminosity;

    }

    randomiseAlpha() {

        const properties = this.properties.alpha || {};
        const base = properties.base || 1;
        const offset = properties.offset || 0; // +/- offset
        const max = offset * 2;
        const randomise = this.Base.Helper.randomise({max});

        let alpha = base - offset + randomise;

        if (alpha > 1) alpha = 1;
        if (alpha < 0) alpha = 0;

        return alpha;

    }

};

module.exports = Background;
