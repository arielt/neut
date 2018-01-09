# Neut-chrome

Lightweight extension that measures how fast your web pages are loading.
Good for low-power devices. Includes only network part of the base page load,
without taking into consideration sub-resources or rendering in browser.

Performance timing is not a precise science. Extension
will show some hints when taken measurements can not be trusted:

* Hit - page was loaded so fast that we believe it was loaded from the browser's cache.

* Foob - browser bug, measurements don't make too much sense.

Not trusted measurements are not included in statistics.
