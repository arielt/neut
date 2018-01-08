/**
 * Content script to be injected to the loaded page. Runs with default run_at
 * parameter.
 * https://developer.chrome.com/extensions/content_scripts
 */

"use strict";
/*jslint browser:true */

function perfTime() {
    console.log("perfTime called");
}

// with default run_at, browser chooses when to inject the script
if (document.readyState === "complete") {
    perfTime();
} else {
    window.addEventListener("load", perfTime);
}
