const os = require('os'),
    path = require('path');

const { FixedThreadPool } = require('poolifier');

const { urlModel } = require('../../models/index');

const pool = new FixedThreadPool(os.cpus().length, path.join(__dirname, 'parseHandler.service.js'));

async function parseUrl(url) {
    let parsedUrls = await pool.execute(url);
    await Promise.all(parsedUrls.map((parsedUrl) => {
        // upsert each url
        return urlModel.updateOne({ url: parsedUrl.url }, parsedUrl, { upsert: true });
    }));
    return parsedUrls;
}

module.exports = {
    parseUrl
}