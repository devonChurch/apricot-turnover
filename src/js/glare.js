const $ = require('jquery');

const Glare = class {

    constructor(Hero, properties) {

        // anchor = 0 / width
        // x = 123, 456
        // y = 123, 456

        this.Hero = Hero;
        this.anchor = properties.anchor;
        this.horizontal = properties.horizontal;
        this.vertical = properties.vertical;
        this.x = this.randomiseX();
        this.y = this.randomiseY();

        console.log('');
        console.log(this.anchor.x, this.anchor.y);
        console.log(this.anchor.x, this.y);
        console.log(this.x, this.anchor.y);

    }

    build() {

        const ctx = this.Hero.ctx;

        ctx.beginPath();
        ctx.moveTo(this.anchor.x, this.anchor.y);
        ctx.lineTo(this.anchor.x, this.y);
        ctx.lineTo(this.x, this.anchor.y);
        ctx.lineTo(this.anchor.x, this.anchor.y);
        ctx.strokeStyle = 'hotpink';
        ctx.stroke();

    }

    randomiseX() {

        const min = this.horizontal.min;
        const max = this.horizontal.max;

        return this.Hero.Helper.randomise({min, max});

    }

    randomiseY() {

        const min = this.vertical.min;
        const max = this.vertical.max;

        return this.Hero.Helper.randomise({min, max});

    }

};

module.exports = Glare;
