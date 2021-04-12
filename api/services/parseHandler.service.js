const { ThreadWorker } = require('poolifier');

const parser = require('./parse.service');

// handle link and parse it
function handleLinkParse(link) {
    // init dictionary of all the links we already parsed
    let parsedLinks = {};
    // recursive function in case sub-links has more links
    function parseLink(linkToParse) {
        // parse link with the mock parser
        let parsedLink = parser(linkToParse);
        // save the link parse result in the dictionary
        parsedLinks[linkToParse] = parsedLink.html;
        // run over all the current sub-links
        parsedLink.links.forEach(l => {
            // in case we did not parsed the current sub-link
            if (parsedLinks[l] === undefined) {
                parseLink(l);
            }
        });
    }
    parseLink(link);
    // convert our dictionary to array of links and their parsed html
    return Object.keys(parsedLinks).map((key) => ({ url: key, html: parsedLinks[key] }));
}

// make this handler thread worker
module.exports = new ThreadWorker(handleLinkParse);