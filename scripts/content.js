// Function to create and insert a custom element into the page
function addCustomElement() {
  const customElement = document.createElement('div');
  customElement.id = 'custom-element';
  customElement.style.position = 'absolute';
  customElement.style.top = '10px';
  customElement.style.right = '10px';
  customElement.style.padding = '10px';
  customElement.style.backgroundColor = 'white';
  customElement.style.border = '1px solid #ccc';
  customElement.innerText = 'Hello, this is a custom element!';
  const textarea = document.getElementById('prompt-textarea');
  if(textarea) {
    // Insert the custom element before the textarea element
    console.log('attempting to insert div to: ', customElements)
    textarea.parentNode.insertBefore(customElement, textarea);
  }
}

addCustomElement();