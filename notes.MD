# Notes

* Logo: Font Masque, Color 28B573

## TODOs

* take tab, take user facing URL, take hostname from there - correlate with onCompleted, aggregate
  requests with url in tab
  chrome.tabs.get(Id).url - will give an URL
  need to add tab permission to manifest

  Why? User has typed URL. He'd be wondering what is notifications.google.com, clients5.google.com e.t.c.


* log or note when records are added to the data store to understand what's tracked - Done, log in navigation collector,
  open from chrome::/extensions

* TODO: top 10 URLs Done

* TODO: put URL results in the table Done

* TODO: aggregate URLs to hosts: most visited hosts Done

* TODO: Javascript linter Done

* TODO: HTML linter

* TODO: autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* ACL: what hosts to exclude from data sharing

* Evaluate and publish local storage consumption

## Open questions

* Youtube videos don't trigger onCompleted events, just onHistoryStateUpdated

* How to confirm request is genuine
