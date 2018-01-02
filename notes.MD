# Notes

* http://www.picturetopeople.org/text_generator/others/transparent/transparent-text-generator.html

  Logo: Font Masque, Color 28B573 (greenish)

  Primary color: #337ab7, Font: ethnocentric

* Debug Chrome local storage

```
chrome.storage.local.get("completed", function (result) {
    console.log(result);
});

chrome.storage.local.get("errored", function (result) {
    console.log(result);
});
```

## TODOs

* introduce tab tracker instead of navigation collector

* fix youtube tracking

* track memory usage

* track storage usage

* filter report data

* show report history

* rethink representation of current entry

* compress everything between switches of active tab as single visit - because
  workig with single site picturepeople generates more requests than visiting
  info sites

* HTML linter

* JS documentation generation - jsdoc: https://npmcompare.com/compare/documentation,esdoc,jsdoc

* autoupdate: https://developer.chrome.com/apps/autoupdate

* User-editable ACL: what hosts to exclude from data collection

* Reset local data

* Evaluate and publish local storage consumption

## Open questions
