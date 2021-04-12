const router = require('express').Router();

const urlController = require('../controllers/url.controller');

router.post('/parse', urlController.parseUrl);

module.exports = router;