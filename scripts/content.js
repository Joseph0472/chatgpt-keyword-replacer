const handleSubmit = (triggerMethod, event) => {
  if(triggerMethod === 'click' || (triggerMethod === 'keydown' && event.key === 'Enter')) {
    const paragraphElement = document.querySelector('#prompt-textarea > p:not(.placeholder)');
    paragraphElement.textContent = paragraphElement.textContent.substring(0, 3);
  }
};

window.addEventListener("load", () => {
  const observer = new MutationObserver((mutations) => {
    const submitButton = document.querySelector('button[aria-label="Send prompt"]');
    mutations.forEach((mutation) => {
      if(submitButton) {
        // Add event listeners
        submitButton.addEventListener('click', handleSubmit('click'), true);
        document.addEventListener('keydown', (event) => { handleSubmit('keydown', event) }, true);
        // Remove event listeners
        submitButton.removeEventListener('click', handleSubmit('click'), true);
        document.removeEventListener('keydown', (event) => { handleSubmit('keydown', event) }, true);
      }
    });
  });
  
  // Start observing the entire body for child list changes
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});
