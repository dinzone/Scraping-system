const { urlModel } = require('../../models/index');

const handleParse = require('./parseHandler.service');

async function parseUrl(url) {
    let parsedUrls = handleParse(url);
    await Promise.all(parsedUrls.map((parsedUrl) => {
        // upsert each url
        return urlModel.updateOne({ url: parsedUrl.url }, parsedUrl, { upsert: true });
    }));
    return parsedUrls;
}

module.exports = {
    parseUrl
}