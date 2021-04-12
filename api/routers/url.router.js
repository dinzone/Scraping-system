const router = require('express').Router();

const { body } = require('express-validator');

const urlController = require('../controllers/url.controller');

router.post('/parse',
    // check if url is valid in body message
    body('url').isURL().withMessage('url should be in the correct format'),
    urlController.parseUrl);

module.exports = router;