"use strict";

/*jslint browser:true */
/*global chrome, $, jQuery, alert*/

// console log will be seen in dev console of the popup

chrome.runtime.sendMessage(
    {'type': 'getMostRequestedUrls'},
    function generateList(response) {
        var i, element, results = response.result;
        for (i = 0; i < results.length; i += 1) {
            element = "<tr><td>";
            element += results[i].url + "</td><td class='center'>";
            element += results[i].numRequests;
            element += "</td><td class='center'>&nbsp;&nbsp;&nbsp;&nbsp;";
            element += Math.round(results[i].average);
            element += "&nbsp;&nbsp;&nbsp;&nbsp;</td><td class='center' style='white-space:nowrap;'>";
            element += Math.round(results[i].last);
            if (results[i].delta > 0) {
                element += "<p class='text-warning text-muted' style='display:inline'><small> +";
            } else {
                element += "<p class='text-success' style='display:inline'><small> ";
            }
            element += Math.round(results[i].delta);
            element += "</small></p></td></tr>";
            $('#hosts-table').find('tbody').append(element);
        }
    }
);
