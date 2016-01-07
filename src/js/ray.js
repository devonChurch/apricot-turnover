const $ = require('jquery');

const Ray = class {

    constructor(Hero, Glare, orientation) {

        this.Hero = Hero;
        this.Glare = Glare;
        this.orientation = orientation;
        this.anchor = orientation === 'left' ? 0 : this.Hero.width;
        this.alpha = 1;
        this.light = this.lightProperties;
        this.dark = this.darkProperties;

    }

    build() {

        // Each Ray instance is made up of a light and dark triangle which are
        // controlled independently of each other during their animation. During
        // each build cycle we modify the triangles x / y-axis value as well as
        // decrease their alpha until they can be ultimately destroyed.

        this.alpha -= this.Glare.depreciation;
        this.drawRay('dark');
        this.drawRay('light');

    }

    drawRay(type) {

        // Each ray triangle (light / dark) has its own modifier setup.
        //
        // From a motion standpoint we want to create overlap between the two
        // variations - we therefore set the x value of the dark triangle to
        // invert and the y value to greatly increate over its light counterpart.
        //
        // Aesthetically, we fade each variation out with a ratio that will have
        // them hit zero at the same time even though their starting alpha
        // values differ. We also have an independent blend mode for each
        // instance that play to the light / dark strengths and their
        // relationship to the underlying colors.

        const ctx = this.Hero.ctx;
        const modifier = this[`${type}Modifiers`];

        this[type].x = this.orientation === 'left' ? this[type].x + modifier.x : this[type].x - modifier.x;
        this[type].y -= modifier.y;

        // Sets the blend mode.
        ctx.globalCompositeOperation = this[type].blend;
        ctx.beginPath();
        ctx.moveTo(this.anchor, this.Hero.height);
        ctx.lineTo(this.anchor, this[type].y);
        ctx.lineTo(this[type].x, this.Hero.height);
        ctx.fillStyle = `hsla(0, 0%, ${this[type].luminosity}%, ${this.alpha * this[type].alpha})`;
        ctx.fill();
        ctx.closePath();

    }

    get lightProperties() {

        return {
            blend: 'overlay',
            luminosity: 100,
            alpha: 0.2,
            x: this.orientation === 'left' ? this.randomiseX() : this.Hero.width - this.randomiseX(),
            y: this.Hero.height
        };

    }

    get darkProperties() {

        return {
            blend: 'multiply',
            luminosity: 0,
            alpha: 0.07,
            x: this.light.x,
            y: this.Hero.height
        };

    }

    get lightModifiers() {

        return {
            x: 1,
            y: 0.5
        };

    }

    get darkModifiers() {

        return {
            x: -0.5,
            y: 1
        };

    }

    randomiseX() {

        const min = this.Hero.width * 0.25;
        const max = this.Hero.width;

        return this.Hero.Helper.randomise({min, max});

    }

};

module.exports = Ray;
