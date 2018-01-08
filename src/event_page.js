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
var TOP_SITES = 10;

// in-memory map of hosts
var hosts = {};

function loadStorageData() {
    chrome.storage.local.get("hosts", function (result) {
        if (result.hosts) {
            hosts = result.hosts;
        }
    });
}

function saveStorageData() {
    chrome.storage.local.set("hosts", hosts);
}

function updateHosts(msg, duration) {
    var host = hosts[msg.hostname];

    if (host === undefined) {
        hosts[msg.hostname] = {
            'reqNum': 1,
            'avg': duration,
            'last': duration
        };
    } else {
        host.reqNum += 1;
        host.avg = host.avg + (duration - host.avg) / host.reqNum;
        host.last = duration;
    }

    saveStorageData();
}

function topSites() {
    var arr = [], k, host;

    for (k in hosts) {
        if (hosts.hasOwnProperty(k)) {
            host = hosts[k];
            arr.push({
                host: k,
                reqNum: host.reqNum,
                avg: host.avg,
                last: host.last
            });
        }
    }

    arr.sort(function (a, b) {
        return b.reqNum - a.reqNum;
    });

    return arr.slice(0, TOP_SITES);
}

/*jslint unparam: true*/
chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
        switch (msg.type) {
        case 'neutTiming':
            var duration = msg.timing.responseEnd - msg.timing.connectStart;
            chrome.browserAction.setBadgeText({text: String((duration / 1000).toFixed(2)), tabId: sender.tab.id});
            if (duration > CACHE_HIT_TIME) {
                updateHosts(msg, duration);
            }
            break;
        case 'topSites':
            sendResponse({
                result: topSites()
            });
            break;
        }
    }
);
/*jslint unparam: false*/

// start event page
loadStorageData();
