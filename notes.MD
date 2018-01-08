# Notes

## Components

content_script.js - Content script. https://developer.chrome.com/extensions/content_scripts

event_page.js - Event page. https://developer.chrome.com/extensions/event_pages

## Timing

networkTime = responseEnd - connectStart

https://www.w3.org/TR/navigation-timing/

https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming

throughput = transferSize / networkTime

https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API

https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API

Interesting, not sure if useful: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation

performance.timing is Navigation Timing object.
performance.getEntriesByType('navigation') is a
Navigation Timing 2 object, is not implemented yet (https://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/)

https://github.com/SOASTA/boomerang/blob/master/plugins/restiming.js
```
> window.performance.getEntries()
(6) [PerformanceNavigationTiming, PerformancePaintTiming, PerformancePaintTiming, PerformanceResourceTiming, PerformanceResourceTiming, PerformanceResourceTiming]

> performance.getEntriesByType("navigation");
var perf = performance.getEntriesByType("navigation")[0]
perf.responseEnd - perf.connectStart
performance.getEntriesByType("navigation")[0].responseEnd - performance.getEntriesByType("navigation")[0].connectStart
```

For detailed inspection resource-by-resource, use

```
performance.getEntriesByType('resource')
```

* http://www.picturetopeople.org/text_generator/others/transparent/transparent-text-generator.html

  Logo: Font Masque, Color 28B573 (greenish)

  Primary color: #337ab7, Font: ethnocentric

* Debug Chrome local storage

```
chrome.storage.local.get(function(result){console.log(result)})

chrome.storage.local.get("completed", function (result) {
    console.log(result);
});

chrome.storage.local.get("errored", function (result) {
    console.log(result);
});
```

## TODOs

* use performance APIs

* collect transfer size

* experimental - introduce throughput

* introduce tab tracker instead of navigation collector

* fix youtube tracking: Navigation - no 'complete' event. However, there is
  an history update. Tab tracker - there is a 'complete' event. There is no event
  for new performance entries (https://github.com/w3c/performance-timeline/issues/1)

  visit: moving from loading to complete in tab state
  network: calculate ratio of network to overload time, apply to visit if it's not available

* track memory usage

* track storage usage

* filter report data

* show report history

* rethink representation of current entry

* compress everything between switches of active tab as single visit - because
  working with single site like picturepeople.com generates more requests than visiting
  info sites

* HTML linter

* JS documentation generation - jsdoc: https://npmcompare.com/compare/documentation,esdoc,jsdoc

* autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* Reset local data

* Evaluate and publish local storage consumption

## Open questions

* What resources do we track - main page HTML document only or following subresources as well?

* How to calculate number of visits
  - simplest: number of page loads
  - sophisticated: number of loading->complete switches in tab tracker

* How to know if site data was cached?
  domainLookupEnd == fetchStart, except persistent connection (singe TCP connection, connectEnd == fetchStart)
  304 Not Modified response
  https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming

* How to know DNS lookup is not required?
  domainLookupEnd == fetchStart

* Do we need TTFB (Time to fist byte)? responseStart - connectEnd

## Idiosyncrasies

* secureConnectionStart == 0 if resource is fetched using pre-existing HTTP connection. secureConnectionStart
  is available for HTTPS resources on HTTP page.

* check an access to requestStart, secureConnectionStart (https://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/)

* DNS was read from the cache if domainLookupEnd - domainLookupStart == 0

* connectEnd - connectStart == 0 -> pre-existing connection

* connectEnd - secureConnectionStart == 0 -> pre-existing connection

* duration == 0 -> cache hit
