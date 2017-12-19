"use strict";

/*jslint browser:true*/
/*global chrome, $, jQuery, alert, NavigationCollector*/

/*
 * --------------------------------------------------
 * Dictionary of tabs
 * --------------------------------------------------
 */
var tabUrlDict = (function () {
    var tabs = {},

        queryTabsCallback = function (allTabs) {
            if (!allTabs) {
                return;
            }
            var i, tab;
            for (i = 0; i < allTabs.length; i += 1) {
                tab = allTabs[i];
                tabs[tab.id] = tab;
            }
        },

        /*jslint unparam: true*/
        updateTabCallback = function (tabId, changeinfo, tab) {
            tabs[tabId] = tab;
        },

        removeTabCallback = function (tabId, removeinfo) {
            delete tabs[tabId];
        };
        /*jslint unparam: false*/

    // init
    chrome.tabs.query({
        active: true
    }, queryTabsCallback);
    chrome.tabs.onUpdated.addListener(updateTabCallback);
    chrome.tabs.onRemoved.addListener(removeTabCallback);

    return {
        contains: function (tabId, url) {
            if (tabs[tabId].url === url) {
                return true;
            }

            return false;
        }
    };
}());

var nav = new NavigationCollector();

chrome.runtime.onStartup.addListener(function () {
    // Don't reset navigation state on startup, we want to preserve data between
    // sessions.
    nav.resetDataStorage();
});
