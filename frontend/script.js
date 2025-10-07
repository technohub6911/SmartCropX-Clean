console.log('🔧 Debug: script.js loaded');

// ==================== FORM NAVIGATION FUNCTIONS ====================

function showSignup() {
    console.log('📝 Showing signup form');
    // Add code to show signup form and hide login form
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    
    console.log('📝 Switched to signup form');
}

function showLogin() {
    console.log('🔐 Showing login form');
    // Add code to show login form and hide signup form
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) signupForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    
    console.log('🔐 Switched to login form');
}

function selectUserType(element, userType) {
    console.log('👤 Selected user type:', userType);
    
    // Remove active class from all options
    document.querySelectorAll('.user-type-option').forEach(opt => {
        opt.classList.remove('active');
        opt.style.backgroundColor = '';
    });
    
    // Add active class to selected option
    element.classList.add('active');
    element.style.backgroundColor = '#4CAF50';
    element.style.color = 'white';
    
    // Store selected user type
    window.selectedUserType = userType;
    console.log('👤 Stored user type:', userType);
}

// ==================== AUTH FUNCTIONS ====================

function login() {
    console.log('🔐 Login function called');
    
    // Get username and password from form
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    
    console.log('🔐 Login attempt:', { username, password });
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.auth-btn [onclick*="login"]');
    if (loginBtn) {
        const loading = loginBtn.querySelector('.btn-loading');
        const text = loginBtn.querySelector('.btn-text');
        if (loading) loading.classList.remove('hidden');
        if (text) text.textContent = 'Signing in...';
    }
    
    // Call your existing loginUser function
    loginUser(username, password);
}

function signup() {
    console.log('📝 Signup function called');
    
    // Get signup form data
    const username = document.getElementById('signupUsername')?.value;
    const password = document.getElementById('signupPassword')?.value;
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const age = document.getElementById('age')?.value;
    const region = document.getElementById('region')?.value;
    
    console.log('📝 Signup attempt:', { username, password, fullName, email, age, region });
    
    if (!username || !password || !fullName) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!window.selectedUserType) {
        alert('Please select a user type');
        return;
    }
    
    // Show loading state
    const signupBtn = document.querySelector('.auth-btn [onclick*="signup"]');
    if (signupBtn) {
        const loading = signupBtn.querySelector('.btn-loading');
        const text = signupBtn.querySelector('.btn-text');
        if (loading) loading.classList.remove('hidden');
        if (text) text.textContent = 'Creating Account...';
    }
    
    // Call your existing registerUser function
    const userData = {
        username,
        password,
        fullName,
        email: email || '',
        age: age ? parseInt(age) : 25,
        region: region || 'Unknown',
        userType: window.selectedUserType || 'buyer'
    };
    
    registerUser(userData);
}

// ==================== EVENT LISTENER SETUP ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Debug: DOM fully loaded');
    
    // Replace all inline onclick handlers with proper event listeners
    replaceInlineHandlers();
    
    // Initialize form states
    initializeForms();
});

function replaceInlineHandlers() {
    // Login buttons
    const loginButtons = document.querySelectorAll('[onclick*="login"]');
    loginButtons.forEach(button => {
        if (button.getAttribute('onclick') === "login()") {
            button.removeAttribute('onclick');
            button.addEventListener('click', login);
            button.style.border = '3px solid blue';
            console.log('🔧 Replaced login button onclick');
        }
    });
    
    // Signup buttons
    const signupButtons = document.querySelectorAll('[onclick*="signup"]');
    signupButtons.forEach(button => {
        if (button.getAttribute('onclick') === "signup()") {
            button.removeAttribute('onclick');
            button.addEventListener('click', signup);
            button.style.border = '3px solid orange';
            console.log('🔧 Replaced signup button onclick');
        }
    });
    
    // Show signup/login navigation
    const showSignupButtons = document.querySelectorAll('[onclick*="showSignup"]');
    const showLoginButtons = document.querySelectorAll('[onclick*="showLogin"]');
    
    showSignupButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', showSignup);
        button.style.border = '3px solid purple';
    });
    
    showLoginButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', showLogin);
        button.style.border = '3px solid teal';
    });
    
    // User type selection
    const userTypeButtons = document.querySelectorAll('[onclick*="selectUserType"]');
    userTypeButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/selectUserType\(this,\s*'([^']+)'\)/);
        if (match) {
            const userType = match[1];
            button.removeAttribute('onclick');
            button.addEventListener('click', function() {
                selectUserType(this, userType);
            });
            button.style.border = '3px solid pink';
        }
    });
    
    // Generic button debugging
    const allButtons = document.querySelectorAll('button, [onclick], a.btn, input[type="submit"], .btn, [role="button"]');
    console.log('🔧 Debug: Found buttons:', allButtons.length);
    
    allButtons.forEach((button, index) => {
        // Only add debug borders to buttons without specific handlers
        if (!button.hasAttribute('onclick') && !button.classList.contains('auth-btn')) {
            button.style.border = '3px solid green';
        }
    });
}

function initializeForms() {
    // Set initial form states
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    if (loginForm && signupForm) {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
    
    // Prevent form submissions
    const forms = document.querySelectorAll('form');
    console.log('🔧 Debug: Found forms:', forms.length);
    forms.forEach((form, index) => {
        form.addEventListener('submit', function(e) {
            console.log('📝 FORM SUBMITTED:', this);
            e.preventDefault();
            console.log('📝 Form submission prevented');
        });
    });
}

// ==================== API FUNCTIONS ====================

async function loginUser(username, password) {
    console.log('🔐 Attempting login for:', username);
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        console.log('🔐 Login response:', data);
        
        // Reset loading state
        resetButtonState('login');
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Login successful! Welcome ' + data.user.fullName);
            // Redirect or update UI here
            window.location.href = '/dashboard.html'; // Change to your actual dashboard page
            return data;
        } else {
            alert('❌ Login failed: ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('🔐 Login error:', error);
        resetButtonState('login');
        alert('❌ Login error: ' + error.message);
        return null;
    }
}

async function registerUser(userData) {
    console.log('📝 Attempting registration for:', userData.username);
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        console.log('📝 Registration response:', data);
        
        // Reset loading state
        resetButtonState('signup');
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Registration successful! Welcome ' + data.user.fullName);
            // Redirect or update UI here
            window.location.href = '/dashboard.html'; // Change to your actual dashboard page
            return data;
        } else {
            alert('❌ Registration failed: ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('📝 Registration error:', error);
        resetButtonState('signup');
        alert('❌ Registration error: ' + error.message);
        return null;
    }
}

function resetButtonState(type) {
    const button = document.querySelector(`[onclick="${type}()"]`);
    if (button) {
        const loading = button.querySelector('.btn-loading');
        const text = button.querySelector('.btn-text');
        if (loading) loading.classList.add('hidden');
        if (text) {
            text.textContent = type === 'login' ? 'Sign In' : 'Create Account';
        }
    }
}

// ==================== UTILITY FUNCTIONS ====================

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        console.log('🔐 User is logged in:', JSON.parse(user));
        return true;
    }
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.href = '/';
}

// Initialize auth check on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (checkAuth()) {
            // User is logged in, redirect to dashboard
            // window.location.href = '/dashboard.html';
        }
    });
} else {
    if (checkAuth()) {
        // User is logged in, redirect to dashboard
        // window.location.href = '/dashboard.html';
    }
}

// Keep your existing functions below...
// [Your existing API functions for products, AI detection, etc.]

console.log('✅ All functions loaded successfully');