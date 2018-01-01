"use strict";

/**
 * URL parsing and filtering mechanism. Keep it fast and simple.
 */

/*jslint browser:true */

var urlFilter = (function () {
    var filteredOutUrls = {
            "about:blank": true,
            "about:srcdoc": true,
        },
        filteredOutProtocols = {
            "chrome:": true,
            "chrome-devtools:": true,
            "chrome-search:": true,
        },
        parser = document.createElement('a');

    return {
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
        parse: function (url) {
            parser.href = url;
            return parser;
        },
        /**
         * Returns true if URL should not be processed, otherwise false.
         */
        filter: function (url) {
            console.debug("Filter url: " + url);

            if (filteredOutUrls[url]) {
                console.debug("URL rejected");
                return true;
            }

            if (filteredOutProtocols[this.parse(url).protocol]) {
                console.debug("Protocol rejected");
                return true;
            }

            console.debug("Approved");
            return false;
        }
    };
}());
