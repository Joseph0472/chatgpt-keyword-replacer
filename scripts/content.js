// Function to create and insert a custom element into the page
function addCustomElement() {
  const existingButton = document.getElementById('toggle-btn');

  // Remove the existing button if it already exists
  if (existingButton) {
    existingButton.remove();
    return;
  }

  // Create the button element
  const customButton = document.createElement('button');
  customButton.id = 'toggle-btn';
  customButton.innerText = 'Click me!';
  customButton.className = 'custom-toggle-btn'; // Use a CSS class for styling

  // Add styles directly if CSS is not being used
  customButton.style.position = 'absolute';
  customButton.style.top = '10px';
  customButton.style.right = '10px';
  customButton.style.padding = '10px';
  customButton.style.backgroundColor = 'white';
  customButton.style.border = '1px solid #ccc';
  customButton.style.cursor = 'pointer';

  // Attach a click event to the button
  customButton.addEventListener('click', () => {
    console.log('Custom button clicked!');
  });

  // Find the textarea element
  const textarea = document.getElementById('prompt-textarea');
  if (textarea) {
    // Insert the custom button before the textarea
    textarea.parentNode.insertBefore(customButton, textarea);
    console.log('Custom button added to the DOM.');
  } else {
    console.error('Textarea element not found.');
  }
}

// Call the function to add the custom element
addCustomElement();
