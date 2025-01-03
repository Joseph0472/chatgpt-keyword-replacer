document.addEventListener('DOMContentLoaded', async () => {
    // Load existing keywords
    const result = await chrome.storage.local.get(['Constants', 'KeywordsDict']);
    const keywords = result.KeywordsDict || {};

    const keywordList = document.getElementById('keywordList');
    
    function createKeywordPair(keyword = '', replacement = '') {
        const div = document.createElement('div');
        div.className = 'keyword-pair';
        
        div.innerHTML = `
            <input type="text" class="keyword" value="${keyword}" placeholder="keyword">
            <input type="text" class="replacement" value="${replacement}" placeholder="replacement">
            <button class="remove">X</button>
        `;

        div.querySelector('.remove').addEventListener('click', () => div.remove());
        return div;
    }

    // Load existing keywords
    Object.entries(keywords).forEach(([keyword, replacement]) => {
        keywordList.appendChild(createKeywordPair(keyword, replacement));
    });

    function showStatus(message, type = 'success') {
        const statusEl = document.getElementById('statusMessage');
        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;
        
        // Force reflow to ensure transition works
        statusEl.offsetHeight;
        
        statusEl.classList.add('show');
        
        setTimeout(() => {
            statusEl.classList.remove('show'); 
        }, 2000);
    }

    // Add new keyword pair
    document.getElementById('addNew').addEventListener('click', () => {
        keywordList.appendChild(createKeywordPair());
    });

    // Save changes
    document.getElementById('saveChanges').addEventListener('click', async () => {
        try {
            const newKeywords = {};
            let hasInvalidInput = false;

            document.querySelectorAll('.keyword-pair').forEach(pair => {
                const keyword = pair.querySelector('.keyword').value.trim();
                const replacement = pair.querySelector('.replacement').value.trim();
                
                // Check for empty strings or spaces
                if (!keyword || !replacement) {
                    hasInvalidInput = true;
                    pair.classList.add('invalid');
                    return;
                }
                
                pair.classList.remove('invalid');
                if (keyword && replacement) {
                    newKeywords[keyword] = replacement;
                }
            });

            if (hasInvalidInput) {
                showStatus('Please fill in all fields', 'error');
                return;
            }

            // Using await with chrome.storage.local.set
            await chrome.storage.local.set({
                Constants: result.Constants,
                KeywordsDict: newKeywords
            });

            // Show success message after successful save
            showStatus('Saved successfully');
        } catch (error) {
            // Handle any errors
            console.error('Error saving keywords:', error);
            showStatus('Failed to save', 'error');
        }
    });
});