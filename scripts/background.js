  // Initialize storage if empty
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(['Constants', 'KeywordsDict']);
  if (!data.KeywordsDict) {
      await chrome.storage.local.set({
          Constants: {
            "SEND_BUTTON_SELECTOR": 'button[aria-label="Send prompt"]',
            "PROMPT_TEXTAREA_SELECTOR": '#prompt-textarea > p:not(.placeholder)',
            "KEY_ENTER": 'Enter'
          },
          KeywordsDict: {
            "test": "replaced word",
          }
      });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['scripts/content.js']
  });
});