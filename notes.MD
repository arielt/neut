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

* UI: add disclaimer - all times are in seconds

* Most visited sites vs LRU sites

* Consider only active tabs - multiple tabs loading in background in quite slow

* HTML linter

* autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* Reset local data

* Evaluate and publish local storage consumption

## Open questions
