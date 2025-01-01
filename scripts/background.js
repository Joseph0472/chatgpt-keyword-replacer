const Constants = {
  "SEND_BUTTON_SELECTOR": 'button[aria-label="Send prompt"]',
  "PROMPT_TEXTAREA_SELECTOR": '#prompt-textarea > p:not(.placeholder)',
  "KEY_ENTER": 'Enter'
}

const KeywordsDict = {
  "AMD": "A secret company"
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['scripts/content.js']
  });
});
chrome.storage.local.set({ Constants: Constants, KeywordsDict: KeywordsDict });