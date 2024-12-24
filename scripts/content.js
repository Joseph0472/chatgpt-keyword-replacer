// Wait for the page to load fully
window.addEventListener("load", () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      var submitButton = document.querySelector('button[aria-label="Send prompt"]');
      if(submitButton) {
          submitButton.addEventListener('click', () => {
          // Get the DOM element
          const paragraphElement = document.querySelector('#prompt-textarea > p:not(.placeholder)');
          // Get its text content
          const textContent = paragraphElement.textContent;
          // Update with substring
          paragraphElement.textContent = textContent.substring(0, 3);
        });
      }
    });
  });
  
  // Start observing the entire body for child list changes
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});
