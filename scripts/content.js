let Constants = {};
let KeywordsDict = {};
// Get Constants from background.js
chrome.storage.local.get((result) => { Constants = result.Constants; KeywordsDict = result.KeywordsDict });

// Update the prompt
const updatePrompt = () => {
  const paragraphElements = document.querySelectorAll(Constants.PROMPT_TEXTAREA_SELECTOR);
  chrome.storage.local.get((result) => { KeywordsDict = result.KeywordsDict });
  paragraphElements.forEach(element => {
    element.textContent = replaceKeywords(element.textContent);
  });
};

// Replace keywords in the text
const replaceKeywords = (text) => {
  Object.entries(KeywordsDict).forEach(([keyword, replacement]) => {
    const regex = new RegExp(keyword, 'gi');
    text = text.replace(regex, replacement);
});
return text;
};

// Observe the body for changes
window.addEventListener("load", () => {
const observer = new MutationObserver((mutations) => {
  const submitButton = document.querySelector(Constants.SEND_BUTTON_SELECTOR);
  mutations.forEach((mutation) => {
    if(submitButton) {
      submitButton.addEventListener('click', () => { updatePrompt() }, true);
      submitButton.removeEventListener('click', () => { updatePrompt() }, true);
      document.addEventListener('keydown', (event) => { if (event.key === Constants.KEY_ENTER && !event.shiftKey) { updatePrompt() }}, true);
      document.removeEventListener('keydown', (event) => { if (event.key === Constants.KEY_ENTER && !event.shiftKey) { updatePrompt() }}, true);
    }
  });
});

// Start observing the entire body for child list changes
observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});