/**
 * Anagramator - Word Finder Application
 * Finds all possible Polish words from given letters using poocoo.pl API
 */

// ============================================================================
// Constants & DOM Elements
// ============================================================================

const API_URL = 'https://api.poocoo.pl/api/v1/words-from-letters';
const DEBOUNCE_DELAY = 300; // ms

const elements = {
    input: document.getElementById('letterInput'),
    clearBtn: document.getElementById('clearBtn'),
    description: document.getElementById('description'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    results: document.getElementById('results')
};

let debounceTimer;

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize app on page load
 */
window.addEventListener('load', () => {
    elements.input.focus();
});

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates and sanitizes user input
 * Removes all characters except Polish and English letters
 * @param {string} value - Raw input value
 * @returns {string} Sanitized lowercase string
 */
function sanitizeInput(value) {
    return value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '').toLowerCase();
}

/**
 * Hides all content sections
 */
function hideAllSections() {
    elements.description.classList.add('hidden');
    elements.loading.classList.add('hidden');
    elements.error.classList.add('hidden');
    elements.results.classList.add('hidden');
}

/**
 * Updates visibility of clear button based on input value
 */
function updateClearButton() {
    elements.clearBtn.classList.toggle('visible', elements.input.value.length > 0);
}

// ============================================================================
// Polish Grammar Helpers
// ============================================================================

/**
 * Returns correct Polish form of word "słowo" based on count
 * @param {number} count - Number of words
 * @returns {string} Correct Polish form
 */
function getWordForm(count) {
    if (count === 1) return 'słowo';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return 'słowa';
    }
    return 'słów';
}

/**
 * Returns correct Polish form of word "litera" based on count
 * @param {number} count - Number of letters
 * @returns {string} Correct Polish form
 */
function getLetterForm(count) {
    if (count === 1) return 'litera';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return 'litery';
    }
    return 'liter';
}

// ============================================================================
// UI Display Functions
// ============================================================================

/**
 * Displays search results grouped by word length
 * @param {Object} data - API response data
 */
function displayResults(data) {
    hideAllSections();
    
    // Validate response data
    if (!data.success || !data.data || !data.data.wordGroups || data.data.wordGroups.length === 0) {
        showError('Nie znaleziono słów z podanych liter');
        return;
    }

    const { wordGroups, totalCount } = data.data;
    
    // Build results HTML
    const resultsHTML = buildResultsHTML(wordGroups, totalCount);
    
    elements.results.innerHTML = resultsHTML;
    elements.results.classList.remove('hidden');
}

/**
 * Builds HTML for results display
 * @param {Array} wordGroups - Groups of words sorted by length
 * @param {number} totalCount - Total number of words found
 * @returns {string} HTML string
 */
function buildResultsHTML(wordGroups, totalCount) {
    let html = `<div class="results-header">Znaleziono ${totalCount} ${getWordForm(totalCount)}</div>`;
    
    wordGroups.forEach(group => {
        const groupTitle = `${group.length} ${getLetterForm(group.length)} (${group.count} ${getWordForm(group.count)})`;
        const wordItems = group.words
            .map(word => `<span class="word-item">${word}</span>`)
            .join('');
        
        html += `
            <div class="word-group">
                <div class="word-group-title">${groupTitle}</div>
                <div class="word-list">${wordItems}</div>
            </div>
        `;
    });
    
    return html;
}

/**
 * Displays error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    hideAllSections();
    elements.error.textContent = message;
    elements.error.classList.remove('hidden');
}

/**
 * Shows description section (initial state)
 */
function showDescription() {
    hideAllSections();
    elements.description.classList.remove('hidden');
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetches words from API based on provided letters
 * @param {string} letters - Letters to search words from
 */
async function fetchWords(letters) {
    try {
        hideAllSections();
        elements.loading.classList.remove('hidden');
        
        const response = await fetch(`${API_URL}?letters=${encodeURIComponent(letters)}`);
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
        } else {
            showError(data.error || 'Wystąpił błąd podczas wyszukiwania');
        }
    } catch (err) {
        showError('Błąd połączenia z serwerem');
    }
}

// ============================================================================
// Event Handlers
// ============================================================================

/**
 * Handles clear button click
 * Resets input and shows description
 */
function handleClearClick() {
    elements.input.value = '';
    updateClearButton();
    showDescription();
    elements.input.focus();
}

/**
 * Handles input changes with debouncing
 * Sanitizes input and triggers API call after delay
 * @param {Event} e - Input event
 */
function handleInput(e) {
    // Sanitize and update input value
    const sanitized = sanitizeInput(e.target.value);
    e.target.value = sanitized;
    
    // Update clear button visibility
    updateClearButton();
    
    // Clear previous debounce timer
    clearTimeout(debounceTimer);
    
    // Show description if input is empty
    if (!sanitized) {
        showDescription();
        return;
    }
    
    // Debounce API call
    debounceTimer = setTimeout(() => {
        fetchWords(sanitized);
    }, DEBOUNCE_DELAY);
}

// ============================================================================
// Event Listeners
// ============================================================================

elements.clearBtn.addEventListener('click', handleClearClick);
elements.input.addEventListener('input', handleInput);

// Handle Enter key press to hide keyboard on mobile
elements.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        elements.input.blur(); // Hide keyboard
    }
});
