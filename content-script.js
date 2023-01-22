const observer = new MutationObserver(() => {
  const tablist = document.querySelector("[role='tablist']");
  if (!tablist) return;

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

  observer.disconnect();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
