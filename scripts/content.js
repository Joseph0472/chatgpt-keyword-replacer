// Wait for the page to load fully
const updatePrompt = () => {
    const paragraphElement = document.querySelector('#prompt-textarea > p:not(.placeholder)');
    paragraphElement.textContent = paragraphElement.textContent.substring(0, 3);
};

window.addEventListener("load", () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if(document.querySelector('button[aria-label="Send prompt"]')) {
        submitButton.addEventListener('click', () => {
          updatePrompt();
        }, true);
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {    
              updatePrompt();
          }
        }, true);
        
      }
    });
  });
  
  // Start observing the entire body for child list changes
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
});
