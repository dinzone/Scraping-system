const sampleSize = require('lodash.samplesize');

const links = [
    'https://www.facbook.com',
    'https://www.google.com',
    'https://www.twitter.com',
    'https://www.github.com',
    'https://www.url5.com',
    'https://www.url6.com',
    'https://www.url7.com',
    'https://www.url8.com',
    'https://www.url9.com',
    'https://www.url10.com',
];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

module.exports = (link) => {
    // generate random number
    const subLinksNumber = getRandomIntInclusive(0, link.length);
    return {
        html: `<html><div>${link}</div></html>`,
        links: sampleSize(links, subLinksNumber)
    }
}