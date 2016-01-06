require('../sass/style.scss');
const Hero = require('./hero');

const newDemo = new Hero({
    height: 800,
    width: 2000,
    background: {
        hue: { base: 195, offset: 20 },
        saturation: { base: 85, offset: 20 },
        luminosity: { base: 50, offset: 20 }
    },
    glare: {
        frequency: 30, // %
        lifespan: 100 // %
    }
});


// setTimeout(() => {
//
//     newDemo.updateCanvas({width: 800});
//
// }, 2000);
