"use strict";

/*jslint browser:true */
/*global chrome, $, jQuery, alert*/

// console log will be seen in dev console of the popup

chrome.runtime.sendMessage(
    {'type': 'getMostRequestedUrls'},
    function generateList(response) {
        var i, results = response.result;
        for (i = 0; i < results.length; i += 1) {
            $('#hosts-table').find('tbody').append(
                "<tr><td>" +
                    results[i].url + "</td><td class='center'>" +
                    results[i].numRequests + "</td><td class='center'>" +
                    Math.round(results[i].average) + "</td></tr>"
            );
        }
    }
);
