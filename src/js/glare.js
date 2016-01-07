const $ = require('jquery');
const Ray = require('./ray');

const Glare = class {

    constructor(Hero, properties) {

        this.Hero = Hero;
        this.properties = properties;
        this.instances = [];
        this.frequency = this.calculateFrequecy();
        this.depreciation = this.calculateDepreciation();
        this.i = 0; // Creation frequency
        this.j = 0; // Ray orientation
        this.createRay();

    }

    animate() {

        // Animate each ray instance independently basing its updated values on
        // its current predicament in its lifecycle.

        this.queryFrequency();
        this.queryDistruction();
        for (let instance of this.instances) instance.build();

    }

    queryFrequency() {

        // We build a new Ray instance each time we hit the users specified
        // frequency value. Once reached we reset the frequency counter and
        // generate a new Ray into the instances array.

        this.i += 1;

        if (this.i > this.frequency) {

            this.i = 0;
            this.createRay();

        }

    }

    calculateFrequecy() {

        // We take the users percentage based frequency value and generate a
        // pixel reference against the height of the canvas.

        const frequency = this.properties.frequency || 30;

        return this.Hero.Helper.findPercentage({percentage: frequency, of: this.Hero.height});

    }

    calculateDepreciation() {

        // We take the users percentage based lifespan value and generate a
        // decimal reference that depicts how much the alpha value of each ray
        // should depreciate until it becomes transparent.

        const lifespan = this.properties.lifespan || 100;
        const distance = this.Hero.Helper.findPercentage({percentage: lifespan, of: this.Hero.height});
        const alpha = 1;

        return alpha / distance;

    }

    createRay() {

        // Generate a new Ray instance into the array. We alternate each rays
        // anchor point from left to right which is governed by the orientation
        // incrementor.

        const orientation = this.j % 2 ? 'left' : 'right';
        const ray = new Ray(this.Hero, this, orientation);

        this.instances.push(ray);
        this.j += 1;

    }

    queryDistruction() {

        // We take a look at the oldest Ray instance and if its alpha value is 0
        // or less we destroy it to save CPU cycles.

        if (this.instances[0].alpha < 0) this.instances.shift();

    }

};

module.exports = Glare;
