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
        this.light = this.lightProperties;
        this.dark = this.darkProperties;

    }

    build() {

        this.drawRay('dark');
        this.drawRay('light');

        console.log(this.light.alpha);

    }

    drawRay(type) {

        const ctx = this.Hero.ctx;
        const modifier = this[`${type}Modifiers`];

        if (this[type].alpha < 0) {

            console.log('DESTROY!!!');

            this.Glare.destroyRay();

        } else {

            this[type].x = this.orientation === 'left' ? this[type].x + modifier.x : this[type].x - modifier.x;
            this[type].y -= modifier.y;
            this[type].alpha -= modifier.alpha;

            ctx.beginPath();
            ctx.moveTo(this.anchor, this.Hero.height);
            ctx.lineTo(this.anchor, this[type].y);
            ctx.lineTo(this[type].x, this.Hero.height);
            ctx.fillStyle = `hsla(0, 0%, ${this[type].luminosity}%, ${this[type].alpha})`;
            ctx.fill();
            ctx.closePath();

        }

    }

    get lightProperties() {

        return {
            luminosity: 100,
            alpha: 0.066,
            x: this.orientation === 'left' ? this.randomiseX() : this.Hero.width - this.randomiseX(),
            y: this.Hero.height
        };

    }

    get darkProperties() {

        return {
            luminosity: 0,
            alpha: 0.033,
            x: this.light.x,
            y: this.Hero.height
        };

    }

    get lightModifiers() {

        return {
            alpha: this.light.alpha / (this.Glare.frequency * 1.5), // 0, // 0.001,
            x: 1,
            y: 0.7
        };

    }

    get darkModifiers() {

        return {
            alpha: this.dark.alpha / (this.Glare.frequency * 1.5), // 0, // 0.002,
            x: 0.7,
            y: 1
        };

    }

    randomiseX() {

        // const x = anchor > 0 ? this.Hero.width - this.randomiseX() : this.randomiseX();

        const min = this.Hero.width * 0.5;
        const max = this.Hero.width * 1.5;

        return this.Hero.Helper.randomise({min, max});

    }

};

module.exports = Ray;
