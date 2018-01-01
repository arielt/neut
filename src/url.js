"use strict";

/**
 * URL parsing and filtering mechanism. Keep it fast and simple.
 */

/*jslint browser:true */

/**
 * URL parser, available fields:
 *     parser.protocol; // => "http:"
 *     parser.hostname; // => "example.com"
 *     parser.port;     // => "3000"
 *     parser.pathname; // => "/pathname/"
 *     parser.search;   // => "?search=test"
 *     parser.hash;     // => "#hash"
 *     parser.host;     // => "example.com:3000"
 */
function parsedUrl(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser;
}

var urlFilter = (function () {
    var filteredOutUrls = {
            "about:blank": true,
            "about:srcdoc": true,
        },
        filteredOutProtocols = {
            "chrome:": true,
            "chrome-devtools:": true,
            "chrome-search:": true,
        };

    return {
        filter: function (url) {
            console.debug("Check url: " + url);

            if (filteredOutUrls[url]) {
                console.debug("Filtered out");
                return true;
            }

            if (filteredOutProtocols[parsedUrl(url).protocol]) {
                console.debug("Filtered out");
                return true;
            }

            console.debug("Approved");
            return false;
        }
    };
}());
