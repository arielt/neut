# Notes

* Logo: Font Masque, Color 28B573

Debug Chrome local storage

```
chrome.storage.local.get("completed", function (result) {
    console.log(result);
});

chrome.storage.local.get("errored", function (result) {
    console.log(result);
});
```

## TODOs

* Don't write empty rows to completed

* Don't write empty rows to error

* make single function that checks URL DONE

* make URL check before any function that pushes to completed_ DONE

* take tab, take user facing URL, take hostname from there - correlate with onCompleted, aggregate
  requests with url in tab
  chrome.tabs.get(Id).url - will give an URL
  need to add tab permission to manifest DONE

  Why? User has typed URL. He'd be wondering what is notifications.google.com, clients5.google.com e.t.c.


* log or note when records are added to the data store to understand what's tracked - DONE, log in navigation collector,
  open from chrome::/extensions

* TODO: top 10 URLs DONE

* TODO: put URL results in the table DONE

* TODO: aggregate URLs to hosts: most visited hosts DONE

* TODO: Javascript linter DONE

* TODO: HTML linter

* TODO: autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* ACL: what hosts to exclude from data sharing

* Evaluate and publish local storage consumption

## Open questions

* Youtube videos don't trigger onCompleted events, just onHistoryStateUpdated

* How to confirm request is genuine
