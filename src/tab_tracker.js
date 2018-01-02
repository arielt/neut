"use strict";

/*global chrome*/
/*jslint unparam: true*/

function TabTracker() {
    var tabs = {},

        activeTabId = null, // track active tab here

        onUpdated = function (tabId, changeInfo, tab) {
            if (tabId === activeTabId) {
                tabs[tabId] = tab;
            }

            if (changeInfo.status === 'complete') {
                console.debug("xxx: completed " + tab.url);
            }
        },

        onRemoved = function (tabId, removeInfo) {
            delete tabs[tabId];
        },

        onActivated = function (activeInfo) {
            activeTabId = activeInfo.tabId;
        };

    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.onRemoved.addListener(onRemoved);
    chrome.tabs.onActivated.addListener(onActivated);

    return {
        // Checks if dict has information about tab with corresponding URL
        contains: function (tabId, url) {
            if (!(tabId && tabs[tabId])) {
                return false;
            }

            if (tabs[tabId].url === url) {
                return true;
            }

            return false;
        },
        // Returns URL of active tab
        activeTabUrl: function () {
            if (tabs[activeTabId]) {
                return tabs[activeTabId].url;
            }
            return null;
        }
    };
}
/*jslint unparam: false*/
