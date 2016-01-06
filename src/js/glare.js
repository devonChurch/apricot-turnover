const $ = require('jquery');
const Ray = require('./ray');

const Glare = class {

    constructor(Hero, properties) {

        // anchor = 0 / width
        // x = 123, 456
        // y = 123, 456

        // single triangle starts fro the bottom and moves up
        // as it gets higher it looses opacity
        // when it reaches 75% or its lifecycle we create another triangle traveling up but flipped in teh y-axis

        //

        this.Hero = Hero;
        this.properties = properties;
        this.instances = [];
        this.frequency = this.calculateFrequecy(); // properties.frequency / 100 * this.Hero.height;
        this.depreciation = this.calculateDepreciation();
        console.log(this.depreciation);
        this.i = 0; // Animation duration
        this.j = 0; // Ray orientation
        this.createRay();

    }

    animate() {

        this.queryDuration();
        this.queryDistruction();
        for (let instance of this.instances) instance.build();

    }

    queryDuration() {

        this.i += 1;

        if (this.i > this.frequency) {

            console.log('Creating new Ray instance');

            this.i = 0;
            this.createRay();

        }

    }

    calculateFrequecy() {

        const frequency = this.properties.frequency || 30;

        return this.Hero.Helper.findPercentage({percentage: frequency, of: this.Hero.height});

    }

    calculateDepreciation() {

        const lifecycle = this.properties.lifecycle || 100;
        const distance = this.Hero.Helper.findPercentage({percentage: lifecycle, of: this.Hero.height});
        const alpha = 1;

        return alpha / distance;

    }

    createRay() {

        const orientation = this.j % 2 ? 'left' : 'right';
        const ray = new Ray(this.Hero, this, orientation);

        this.instances.push(ray);
        this.j += 1;

    }

    queryDistruction() {

        if (this.instances[0].alpha < 0) this.instances.shift();

    }

};

module.exports = Glare;
