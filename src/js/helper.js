const $ = require('jquery');

const Helper = class {

	// A series of more “generic” functions uses across the execution.

	constructor(Hero) {

		this.Hero = Hero;

	}

	randomise({min = 0, max}) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

};

module.exports = Helper;
