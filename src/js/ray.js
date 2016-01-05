const $ = require('jquery');

const Ray = class {

    constructor(Hero, Glare, orientation) {

        console.log('Creating new Ray instance');

        // API = Glare - Frequency & Opacity

        // anchor = 0 / width
        // x = 123, 456
        // y = 123, 456

        // single triangle starts fro the bottom and moves up
        // as it gets higher it looses opacity
        // when it reaches 75% or its lifecycle we create another triangle traveling up but flipped in teh y-axis

        this.Hero = Hero;
        this.Glare = Glare;
        this.orientation = orientation;
        this.anchor = orientation === 'left' ? 0 : this.Hero.width;
        this.alpha = 1;
        this.light = this.lightProperties;
        this.dark = this.darkProperties;

    }

    build() {

        this.alpha -= 0.001;
        this.drawRay('dark');
        this.drawRay('light');

    }

    drawRay(type) {

        const ctx = this.Hero.ctx;
        const modifier = this[`${type}Modifiers`];

        this[type].x = this.orientation === 'left' ? this[type].x + modifier.x : this[type].x - modifier.x;
        this[type].y -= modifier.y;

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
            alpha: 0.2, // 0.066,
            x: this.orientation === 'left' ? this.randomiseX() : this.Hero.width - this.randomiseX(),
            y: this.Hero.height
        };

    }

    get darkProperties() {

        return {
            blend: 'overlay',
            luminosity: 0,
            alpha: 0.1, // 0.033,
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
        const max = this.Hero.width; // * 2;

        return this.Hero.Helper.randomise({min, max});

    }

};

module.exports = Ray;
