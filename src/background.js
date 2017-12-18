"use strict";

/*jslint browser:true*/
/*global chrome, $, jQuery, alert, NavigationCollector*/

var nav = new NavigationCollector();
var eventList = ['onBeforeNavigate',
                 'onCreatedNavigationTarget',
                 'onCommitted',
                 'onCompleted',
                 'onDOMContentLoaded',
                 'onErrorOccurred',
                 'onReferenceFragmentUpdated',
                 'onTabReplaced',
                 'onHistoryStateUpdated'];

eventList.forEach(function (e) {
    chrome.webNavigation[e].addListener(function (data) {
        // chrome.i18n.getMessage('inHandler')

        if (typeof data) {
            console.log(chrome.i18n.getMessage('inHandler'), e, data);
        } else {
            console.error(chrome.i18n.getMessage('inHandlerError'), e);
        }
    });
});

chrome.runtime.onStartup.addListener(function () {
    // Don't reset navigation state on startup, we want to preserve data between
    // sessions.
    nav.resetDataStorage();
});
