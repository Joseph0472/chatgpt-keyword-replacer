// Function to create and insert a custom element into the page
function addCustomElement() {
  var textarea = document.getElementById('prompt-textarea');
            
  // Check if the textarea element exists
  if (textarea) {
      // Add/insert text into the textarea
      textarea.value += 'blah';
  } else {
      console.error('Textarea element not found');
  }
}

// Run the function to add the custom element
addCustomElement();