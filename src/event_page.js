/**
 * Event page to collect performance reports.
 * Use Chrome runtime to receive messages: https://developer.chrome.com/apps/runtime.
 * We assume runtime always exists.
 * We measure only networking part, not including DNS lookup: establishing
 * connection + getting base page.
 * Cache hit considered to be duration < 30 ms.
 */

"use strict";
/*jslint browser:true, todo: true*/
/*global chrome*/

/*jslint unparam: true*/
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
        case 'neutTiming':
            var duration = String(((msg.timing.responseEnd - msg.timing.connectStart) / 1000).toFixed(2));
            chrome.browserAction.setBadgeText({text: duration, tabId: sender.tab.id});
            break;
        case 'topSites':
            break;
        }
    }
);
/*jslint unparam: false*/
