const { validationResult } = require('express-validator');

const urlService = require('../services/url.service');

async function parseUrl(req, res) {
    // check if the request is valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { url } = req.body;
    try {
        return res.send(await urlService.parseUrl(url));
    } catch (err) {
        console.log('error when parse url');
        console.log(err);
        return res.status(500).send('Internal server error');
    }
}

module.exports = {
    parseUrl
};