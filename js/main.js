// Main JavaScript for Personal Stylist Website

$(document).ready(function() {
    // Initialize the website
    initNavigation();
    checkLoginStatus();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Set active navigation item based on current page
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    $('.left-menu nav ul li a').each(function() {
        var href = $(this).attr('href');
        if (href === currentPage) {
            $(this).addClass('active');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 20
            }, 500);
        }
    });
}

/**
 * Check if user is logged in and update UI accordingly
 */
function checkLoginStatus() {
    var isLoggedIn = localStorage.getItem('stylistLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showLoggedInState();
    } else {
        showLoggedOutState();
    }
}

/**
 * Show UI elements for logged in users
 */
function showLoggedInState() {
    $('.login-required').addClass('show');
    $('.login-link').text('Logout').attr('href', '#').on('click', function(e) {
        e.preventDefault();
        logout();
    });
}

/**
 * Show UI elements for logged out users
 */
function showLoggedOutState() {
    $('.login-required').removeClass('show');
    $('.login-link').text('Login').attr('href', 'login.html').off('click');
}

/**
 * Handle user login
 * NOTE: This is a demo implementation for educational purposes only.
 * In a production environment, this should validate against a secure
 * backend server with proper authentication.
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {boolean} - Whether login was successful
 */
function login(username, password) {
    // Demo login - stores login state locally
    // IMPORTANT: Replace with server-side authentication for production use
    if (username && password && username.length >= 3 && password.length >= 6) {
        localStorage.setItem('stylistLoggedIn', 'true');
        localStorage.setItem('stylistUsername', username);
        checkLoginStatus();
        return true;
    }
    return false;
}

/**
 * Handle user logout
 */
function logout() {
    localStorage.removeItem('stylistLoggedIn');
    localStorage.removeItem('stylistUsername');
    checkLoginStatus();
    window.location.href = 'index.html';
}

/**
 * Utility function to show messages to user
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success', 'error', 'info')
 */
function showMessage(message, type) {
    // Sanitize type to only allow known values
    var allowedTypes = ['success', 'error', 'info'];
    var safeType = allowedTypes.indexOf(type) !== -1 ? type : 'info';
    
    // Create element and set text content safely to prevent XSS
    var messageDiv = $('<div class="message"></div>');
    messageDiv.addClass(safeType);
    messageDiv.text(message);
    $('body').append(messageDiv);
    
    setTimeout(function() {
        messageDiv.fadeOut(function() {
            $(this).remove();
        });
    }, 3000);
}
