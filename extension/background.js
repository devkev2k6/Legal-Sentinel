chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analyzeLink") {
    chrome.storage.local.set({ pendingUrl: message.url }, () => {
      chrome.sidePanel.open({ tabId: sender.tab.id }).then(() => {
        chrome.runtime.sendMessage({ action: "startPendingAnalysis", url: message.url });
      });
    });
  }
});
