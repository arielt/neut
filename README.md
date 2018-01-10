# Neut-chrome

Lightweight extension that measures how fast your web pages are loading.
Suitable for low-power devices. Includes only network part of the base page load,
without taking into consideration sub-resources or rendering in browser.

Performance timing is not a precise science. Extension
will show some hints when taken measurements can not be trusted:

* Hit - page was loaded so fast that we believe it was loaded from the browser's cache.

* Foob - browser bug, measurements don't make too much sense.

Not trusted measurements are not included in statistics.

## Installation

* Clone the repo with submodules:
```
git clone --recursive <repo URL>
```

* Visit chrome://extensions in your browser (or open up the Chrome menu by clicking the icon to the far right of the Omnibox: The menu's icon is three horizontal bars. and select Extensions under the More Tools menu to get to the same place).

* Ensure that the Developer mode checkbox in the top right-hand corner is checked.

* Click Load unpacked extension… to pop up a file-selection dialog.

* Navigate to the repo directory and select it.
