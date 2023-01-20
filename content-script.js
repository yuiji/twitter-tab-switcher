function switchTab() {
  const tablist = document.querySelector("[role='tablist']");
  const followDiv = tablist.childNodes[1];
  const followButton = followDiv.childNodes[0];
  const forYouDiv = tablist.childNodes[0];
  const forYouButton = forYouDiv.childNodes[0];

  chrome.storage.local.get(['selectedTab'], result => {
    if (result.selectedTab === 'forYou') {
      forYouButton.click();
    } else {
      followButton.click();
    }
  });

  followButton.addEventListener('click', () => {
    chrome.storage.local.set({ selectedTab: 'follow' });
  });

  forYouButton.addEventListener('click', () => {
    chrome.storage.local.set({ selectedTab: 'forYou' });
  });
}

function runAfterLoad() {
  function checkDomLoaded() {
    if (document.querySelector("[role='tablist']")) {
      clearInterval(DOMInitTimer);
      switchTab();
    }
  }

  let DOMInitTimer = setInterval(checkDomLoaded, 100);
}

window.addEventListener('load', runAfterLoad);