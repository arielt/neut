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

* HTML linter

* autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* Reset local data

* Evaluate and publish local storage consumption

## Open questions
