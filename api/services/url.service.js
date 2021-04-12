const os = require('os'),
    path = require('path');

const { FixedThreadPool } = require('poolifier');

const { urlModel } = require('../../models/index');

// create worker threads pool that should execute the function on parseHandler.service.js
const pool = new FixedThreadPool(os.cpus().length, path.join(__dirname, 'parseHandler.service.js'));

async function parseUrl(url) {
    // parse url and its sub-links
    let parsedUrls = await pool.execute(url);
    // upsert each url
    await Promise.all(parsedUrls.map((parsedUrl) => {
        return urlModel.updateOne({ url: parsedUrl.url }, parsedUrl, { upsert: true });
    }));
    return parsedUrls;
}

module.exports = {
    parseUrl
}