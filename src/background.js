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
        allTabs && allTabs.forEach(function (tab) {
            tabs[tab.id] = tab;
        });
    },

    updateTabCallback = function (tabId, changeinfo, tab) {
        tabs[tabId] = tab;
    },

    removeTabCallback = function (tabId, removeinfo) {
        delete tabs[tabId];
    };

    // init
    chrome.tabs.query({ active: true }, queryTabsCallback);
    chrome.tabs.onUpdated.addListener(updateTabCallback);
    chrome.tabs.onRemoved.addListener(removeTabCallback);

    return {
      contains: function (tabId, url) {
          if (tabs[tabId].url == url) {
              return true;
          }

         return false;
      }
    };

 }());

var nav = new NavigationCollector();
var eventList = ['onBeforeNavigate',
                 'onCreatedNavigationTarget',
                 'onCommitted',
                 'onCompleted',
                 'onDOMContentLoaded',
                 'onErrorOccurred',
                 // 'onReferenceFragmentUpdated',
                 'onTabReplaced',
                 // 'onHistoryStateUpdated'
                 ];

eventList.forEach(function (e) {
    chrome.webNavigation[e].addListener(function (data) {
        if (typeof data) {
            // console.log(chrome.i18n.getMessage('inHandler'), e, data);
        } else {
            // console.error(chrome.i18n.getMessage('inHandlerError'), e);
        }
    });
});

chrome.runtime.onStartup.addListener(function () {
    // Don't reset navigation state on startup, we want to preserve data between
    // sessions.
    nav.resetDataStorage();
});
