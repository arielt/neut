/**
 * Content script to be injected to the loaded page. Runs with default run_at
 * parameter: https://developer.chrome.com/extensions/content_scripts.
 * Performace timing: https://www.w3.org/TR/navigation-timing/.
 * All page information, including URL has to be collected by content script.
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

        // TODO: exclude metrics not used in immediate calculation
        timing = {
            'fetchStart': perf.fetchStart,
            'domainLookupStart': perf.domainLookupStart,
            'domainLookupEnd': perf.domainLookupStart,
            'connectStart': perf.connectStart,
            'connectEnd': perf.connectEnd,
            'requestStart': perf.requestStart,
            'responseStart': perf.responseStart,
            'responseEnd': perf.responseEnd,
            'string': JSON.stringify(perf)
        };

        // send message instead
        console.log(timing);

        // try to send the whole object + url
        chrome.runtime.sendMessage(timing);
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
