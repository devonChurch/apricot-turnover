# Apricot Turnover

A hero module using procedural color transitions.

## Demo

- [Demo (Text)](http://codepen.io/DevonChurch/full/NxpmYN/)
- [Demo (Hero)](http://codepen.io/DevonChurch/full/vLmXzM/)

## Installation

- Clone this repository
```
git clone https://github.com/devonChurch/apricot-turnover.git
```

- Install project dependancies
```
npm install
```

- Start up a [Webpack](https://webpack.github.io/docs/webpack-dev-server.html) development server at http://localhost:8080/webpack-dev-server/
```
npm start
```

## Usage

There are a variety of values you can pass into the initialiser to customise the execution to your liking. None of customisable values are mandatory as everything has a preset default,  so initialising with no parameters will still successfully generate.

- This will generate the canvas using all default values.

```javascript
const default = new ApricotTurnover();
```

- This will generate a customised canvas (remember that you can leave any parameter blank). Below are the default values baked into the code.

```javascript
const custom = new ApricotTurnover({
    // Element to append the generated canvas to.
	$wrapper: $('#apricot-turnover'),
    // Canvas dimensions.
	width: 1000,
	height: 500,
    // Properties for the background gradient that uses the full canvas area.
	background: {
        // % value of how fast the gradient transitions.
        speed: 100
        // hsla values of the base color in which to create the instance around.
        // The offset parameter dictates how far to deviate from the base value
        // when we randomly generate new color stops during the gradient
        // transition.
		hue: { base: 340, offset: 50 },
		saturation: { base: 80, offset: 20 },
		luminosity: { base: 50, offset: 10 },
        alpha: { base: 1, offset: 0 }
	},
    // Properties for the animated triangles that move across the canvas.
	glare: {
        // % value (based on the canvas height) of how often a new Glare
        // instance should be created.
        frequency: 30,
        // % value (based on the canvas height) of how long it takes until a
        // Glare instances alpha reaches 0.
        lifespan: 100
    }
});
```

## License

MIT
