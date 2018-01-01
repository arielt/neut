"use strict";

/*jslint browser:true */
/*global chrome, $, jQuery, alert*/

chrome.runtime.sendMessage(
    {'type': 'getActiveSite'},
    function generateList(response) {
        var i, element, results = response.result;

        if (!results) {
            element = "<tr><td colspan='4'><h6 class='center text-muted'>No reliable information</h6></td></tr>";
            $('#current-table').find('tbody').append(element);
            return;
        }

        for (i = 0; i < results.length; i += 1) {
            element = "<tr><td>";
            element += results[i].url + "</td><td class='center'>";
            element += results[i].numRequests;
            element += "</td><td class='center'>";
            element += (results[i].average / 1000).toFixed(2);
            element += "</td><td class='center' style='white-space:nowrap;'>";
            element += (results[i].last / 1000).toFixed(2);
            if (results[i].delta > 0) {
                element += "<p class='text-warning text-muted' style='display:inline'><small> +";
            } else {
                element += "<p class='text-success' style='display:inline'><small> ";
            }
            element += (results[i].delta / 1000).toFixed(2);
            element += "</small></p></td></tr>";
            $('#current-table').find('tbody').append(element);
        }
    }
);

chrome.runtime.sendMessage(
    {'type': 'getMostRequestedSites'},
    function generateList(response) {
        var i, element, results = response.result;
        for (i = 0; i < results.length; i += 1) {
            element = "<tr><td>";
            element += results[i].url + "</td><td class='center'>";
            element += results[i].numRequests;
            element += "</td><td class='center'>";
            element += (results[i].average / 1000).toFixed(2);
            element += "</td><td class='center' style='white-space:nowrap;'>";
            element += (results[i].last / 1000).toFixed(2);
            if (results[i].delta > 0) {
                element += "<p class='text-warning text-muted' style='display:inline'><small> +";
            } else {
                element += "<p class='text-success' style='display:inline'><small> ";
            }
            element += (results[i].delta / 1000).toFixed(2);
            element += "</small></p></td></tr>";
            $('#hosts-table').find('tbody').append(element);
        }
    }
);
