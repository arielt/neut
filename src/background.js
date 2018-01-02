"use strict";

/*global NavigationCollector, TabTracker*/

var tabTracker = new TabTracker();
var nav = new NavigationCollector();

/* don't reset the storage on browser start
chrome.runtime.onStartup.addListener(function () {
    nav.resetDataStorage();
});
*/
