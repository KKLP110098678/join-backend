
/**
 * 
 * @fileoverview Summary module for Join Kanban Project Management Tool
 * Manages the summary page with personalized greeting and session management
 * @author Join Development Team
 * @version 1.0.0
 */

/**
 * Checks if the user is logged in
 * Redirects to login page if no active session exists
 * 
 * @function checkSession
 * @returns {void}
 * 
 * @example
 * // Called automatically when page loads
 * checkSession();
 */
function checkSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        window.location.href = './login.html';
    }
}

/**
 * Returns the appropriate time-of-day greeting
 * Based on the current time, a corresponding greeting is selected
 * 
 * @function getTimeOfDayGreeting
 * @returns {string} Greeting text based on time of day
 *                   - "Good morning" (05:00-11:59)
 *                   - "Good afternoon" (12:00-17:59)
 *                   - "Good evening" (18:00-21:59)
 *                   - "Good night" (22:00-04:59)
 * 
 * @example
 * const greeting = getTimeOfDayGreeting();
 * console.log(greeting); // "Good morning"
 */
function getTimeOfDayGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
    } else if (hour >= 18 && hour < 22) {
        return 'Good evening';
    } else {
        return 'Good night';
    }
}

/**
 * Updates the greeting text on the summary page
 * Displays time-based greeting with username for logged-in users
 * Guest users receive only the time-of-day greeting without name
 * 
 * @function updateGreeting
 * @returns {void}
 * 
 * @example
 * // For logged-in user: "Good morning, John Doe"
 * // For guest user: "Good morning"
 * updateGreeting();
 */
function updateGreeting() {
    const greetingElement = document.querySelector('.summary-greeting');
    
    if (!greetingElement) return;
    
    const isGuest = sessionStorage.getItem('isGuest');
    const userName = sessionStorage.getItem('userName');
    const timeGreeting = getTimeOfDayGreeting();
    
    if (isGuest === 'true') {
        // For guest users only time-of-day greeting
        greetingElement.textContent = timeGreeting;
    } else if (userName) {
        // For logged-in users: greeting + name
        greetingElement.textContent = `${timeGreeting}, ${userName}`;
    } else {
        // Fallback
        greetingElement.textContent = timeGreeting;
    }
}

/**
 * Initializes the summary page
 * Performs session check and updates the greeting
 * Called automatically when page loads
 * 
 * @function initSummary
 * @returns {void}
 * 
 * @example
 * // Automatic call on page load
 * initSummary();
 */
function initSummary() {
    checkSession();
    updateGreeting();
}

// Execute on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSummary);
} else {
    initSummary();
}
