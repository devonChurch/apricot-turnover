const $ = require('jquery');

const Helper = class {

	// A series of more “generic” functions uses across the execution.

	constructor(Hero) {

		this.Hero = Hero;

	}

	randomise({min = 0, max}) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

    get boolean() {

        return this.randomise({max: 1}) % 2 === 0 ? false : true;

    }

    round({value, decimalPlace = 1}) {

        let round = '1';

        for (let i = 0; i < decimalPlace; i += 1) round += '0';
        round = parseInt(round, 10);

        return Math.round(value * round) / round;

    }

};

module.exports = Helper;
