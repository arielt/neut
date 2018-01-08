/**
 * Content script to be injected to the loaded page. Runs with default run_at
 * parameter: https://developer.chrome.com/extensions/content_scripts.
 * Timing API: https://www.w3.org/TR/navigation-timing.
 * All page information, including URLs has to be collected by content script.
 */

"use strict";
/*jslint browser:true, todo: true*/
/*global performance, chrome*/

function perfTime() {
    // yield, otherwise loadEventEnd will be zero
    setTimeout(function () {
        var perf = performance.timing, timing;

        if (perf.loadEventEnd <= 0) {
            return;
        }

        timing = {
            'connectStart': perf.connectStart,
            'responseEnd': perf.responseEnd,
            'string': JSON.stringify(perf)
        };

        chrome.runtime.sendMessage({
            'hostname': window.location.hostname,
            'timing': timing
        });
    }, 0);
}

if (window.performance && performance.timing && chrome.runtime) {
    // with default run_at, browser chooses when to inject the script
    if (document.readyState === "complete") {
        perfTime();
    } else {
        window.addEventListener("load", perfTime);
    }
}
