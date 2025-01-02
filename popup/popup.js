document.addEventListener('DOMContentLoaded', async () => {
    // Load existing keywords
    const result = await chrome.storage.local.get(['Constants', 'KeywordsDict']);
    const keywords = result.KeywordsDict || {};

    const keywordList = document.getElementById('keywordList');
    
    function createKeywordPair(keyword = '', replacement = '') {
        const div = document.createElement('div');
        div.className = 'keyword-pair';
        
        div.innerHTML = `
            <input type="text" class="keyword" value="${keyword}" placeholder="Keyword">
            <input type="text" class="replacement" value="${replacement}" placeholder="Replacement">
            <button class="remove">X</button>
        `;

        div.querySelector('.remove').addEventListener('click', () => div.remove());
        return div;
    }

    // Load existing keywords
    Object.entries(keywords).forEach(([keyword, replacement]) => {
        keywordList.appendChild(createKeywordPair(keyword, replacement));
    });

    // Add new keyword pair
    document.getElementById('addNew').addEventListener('click', () => {
        keywordList.appendChild(createKeywordPair());
    });

    // Save changes
    document.getElementById('saveChanges').addEventListener('click', async () => {
        try {
            const newKeywords = {};
            document.querySelectorAll('.keyword-pair').forEach(pair => {
                const keyword = pair.querySelector('.keyword').value.trim();
                const replacement = pair.querySelector('.replacement').value.trim();
                if (keyword && replacement) {
                    newKeywords[keyword] = replacement;
                }
            });
    
            // Debug logs
            console.log('About to save:', {
                Constants: result.Constants,
                KeywordsDict: newKeywords
            });
    
            await chrome.storage.local.set({
                Constants: result.Constants,
                KeywordsDict: newKeywords
            });
    
            // Verify the save by reading back
            const savedData = await chrome.storage.local.get(['Constants', 'KeywordsDict']);
            console.log('Saved data:', savedData);
    
            alert('Keywords saved successfully!');
        } catch (error) {
            // More detailed error logging
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                error
            });
            alert('Failed to save keywords. Check console for details.');
        }
    });
});