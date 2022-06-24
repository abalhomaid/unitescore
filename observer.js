// ==UserScript==
// @name         Pokemon Unite API link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Link to Pokemon Unite API
// @author       abalhomaid
// @match        https://www.twitch.tv/**
// @grant        none
// ==/UserScript==


styleSheet = `
.uniteBtn {
    padding-right: 3px;
    padding-left: 3px;
    font-size: 16px;
    color: red;
}
`;

s = document.createElement('style');
s.type = "text/css";
s.innerHTML = styleSheet;
(document.head || document.documentElement).appendChild(s);



window.onload = function() {
  'use strict';

  function addUniteBtn(ele, author) {
    let btn = document.createElement("button");
    document.createElement("button");
    btn.className = "uniteBtn";
    btn.innerHTML = "P";

    btn.onclick = () => {
      window.open("https://uniteapi.dev/p/" + author);
    }

    // https://uniteapi.dev/p/xsiegmeyerx
    // https://uniteapi.dev/p/CrisHeroes

    ele.insertBefore(btn, ele.childNodes[0]);
  }

  function observeChat() {
    let chat = document.getElementsByClassName("chat-scrollable-area__message-container")[0];

    // Options for the observer (which mutations to observe)
    let config = {
      childList: true
    };

    // Callback function to execute when mutations are observed
    let callback = function(mutationList, observer) {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationList) {
        let message = mutation.addedNodes[0];
        if (message.className === "chat-line__message") {
          let badges = message.getElementsByClassName("chat-line__username-container")[0];
          let author = message.getElementsByClassName("chat-author__display-name")[0];
          author = author.textContent;
          addUniteBtn(badges, author);
        }
      }
    };

    // Create an observer instance linked to the callback function
    let observer = new MutationObserver(callback, config);

    // Start observing the target node for configured mutations
    observer.observe(chat, config);
  }

  // Observe chat to add Unite btn
  observeChat();

};
