chrome.runtime.sendMessage(
    {'type': 'getMostRequestedUrls'},
    function generateList(response) {
      var section = document.querySelector('body>div>div>div>section');
      var results = response.result;
      var ol = document.createElement('ol');
      var li, p, code, text;
      var i;
      for (i = 0; i < results.length; i++ ) {
        li = document.createElement('li');
        p = document.createElement('p');
        code = document.createElement('code');
        code.textContent = results[i].url;
        text = document.createTextNode(
          chrome.i18n.getMessage('navigationDescription',
            [results[i].numRequests,
            results[i].average]));
        p.appendChild(code);
        p.appendChild(text);
        li.appendChild(p);
        ol.appendChild(li);
      }
      section.innerHTML = '';
      section.appendChild(ol);
    });
