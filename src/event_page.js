/**
 * Event page to collect performance reports.
 * Use Chrome runtime to receive messages: https://developer.chrome.com/apps/runtime.
 * We assume runtime always exists.
 */

"use strict";
/*jslint browser:true, todo: true*/
/*global chrome*/

/*jslint unparam: true*/
// add listener for content script messages
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // TODO: process updates
        console.log("Got update from tab " + sender.tab.id);
        console.log(request);
    }
);
/*jslint unparam: false*/
