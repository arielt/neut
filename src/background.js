"use strict";

/*jslint browser:true*/
/*global chrome, $, jQuery, alert, NavigationCollector*/

/*jslint unparam: true*/

/*
 * --------------------------------------------------
 * Dictionary of tabs
 * --------------------------------------------------
 */
var tabUrlDict = (function () {
    var tabs = {},

        activeTabId = null, // track active tab here

        onUpdated = function (tabId, changeinfo, tab) {
            if (tabId === activeTabId) {
                tabs[tabId] = tab;
            }
        },

        onRemoved = function (tabId, removeinfo) {
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
}());
/*jslint unparam: false*/

var nav = new NavigationCollector();

/* don't reset the storage on browser start
chrome.runtime.onStartup.addListener(function () {
    nav.resetDataStorage();
});
*/
