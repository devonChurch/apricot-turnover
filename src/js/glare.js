const $ = require('jquery');
const Ray = require('./ray');

const Glare = class {

    constructor(Hero) {

        // anchor = 0 / width
        // x = 123, 456
        // y = 123, 456

        // single triangle starts fro the bottom and moves up
        // as it gets higher it looses opacity
        // when it reaches 75% or its lifecycle we create another triangle traveling up but flipped in teh y-axis

        //

        this.Hero = Hero;
        this.instances = [];
        this.frequency = 300;
        this.i = 0; // Animation duration
        this.j = 0; // Ray orientation
        this.createRay();

    }

    animate() {

        this.queryDuration();
        for (let instance of this.instances) instance.build();

    }

    queryDuration() {

        this.i += 1;

        if (this.i > this.frequency) {

            this.i = 0;
            this.createRay();

        }

    }

    createRay() {

        const orientation = this.j % 2 ? 'left' : 'right';
        const ray = new Ray(this.Hero, this, orientation);

        this.instances.push(ray);
        this.j += 1;

    }

    destroyRay() {

        console.log('DESTROY!!!');

        this.instances.shift();

        console.log(this.instances);

    }

};

module.exports = Glare;
