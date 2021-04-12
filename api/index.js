const router = require('express').Router();

// require all models routers
const urlRouter = require('./routers/url.router');

router.use('/', urlRouter);

module.exports = router;