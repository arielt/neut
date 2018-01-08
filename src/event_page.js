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

var CACHE_HIT_TIME = 30;

/*jslint unparam: true*/
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
        case 'neutTiming':
            var duration = msg.timing.responseEnd - msg.timing.connectStart;
            chrome.browserAction.setBadgeText({text: String((duration / 1000).toFixed(2)), tabId: sender.tab.id});
            if (duration > CACHE_HIT_TIME) {
                chrome.storage.local.get("hosts", function (result) {
                    if (!result.hosts) {
                        result.hosts = {};
                    }

                    var host = result.hosts[msg.hostname];
                    if (host === undefined) {
                        result.hosts[msg.hostname] = {
                            'reqNum': 1,
                            'avg': duration,
                            'last': duration
                        };
                    } else {
                        host.reqNum += 1;
                        host.avg = host.avg + (duration - host.avg) / host.reqNum;
                        host.last = duration;
                    }
                    chrome.storage.local.set(result);
                });
            }
            break;
        case 'topSites':
            break;
        }
    }
);
/*jslint unparam: false*/
