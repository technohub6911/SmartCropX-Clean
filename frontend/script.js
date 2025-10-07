console.log('🔧 Debug: script.js loaded');

// ==================== FORM NAVIGATION FUNCTIONS ====================

function showSignup() {
    console.log('📝 Showing signup form');
    // Add code to show signup form and hide login form
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    
    console.log('📝 Switched to signup form');
}

function showLogin() {
    console.log('🔐 Showing login form');
    // Add code to show login form and hide signup form
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
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
    
    // Get username and password from form - try multiple selectors
    const username = document.getElementById('username')?.value || 
                    document.querySelector('input[placeholder*="username" i]')?.value ||
                    document.querySelector('input[type="text"]')?.value;
    
    const password = document.getElementById('password')?.value || 
                    document.querySelector('input[placeholder*="password" i]')?.value ||
                    document.querySelector('input[type="password"]')?.value;
    
    console.log('🔐 Login attempt:', { username, password });
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.auth-btn, button[onclick*="login"]');
    if (loginBtn) {
        const loading = loginBtn.querySelector('.btn-loading, .loading');
        const text = loginBtn.querySelector('.btn-text, .btn-text');
        if (loading) loading.classList.remove('hidden');
        if (text) text.textContent = 'Signing in...';
    }
    
    // Call your existing loginUser function
    loginUser(username, password);
}

function signup() {
    console.log('📝 Signup function called');
    
    // Debug: Show all form fields
    const allInputs = document.querySelectorAll('input');
    console.log('📝 All form inputs found:', allInputs.length);
    
    allInputs.forEach(input => {
        console.log(`📝 Input - ID: ${input.id}, Placeholder: ${input.placeholder}, Value: ${input.value}`);
    });
    
    // Get signup form data - try multiple selectors
    const username = document.getElementById('signupUsername')?.value || 
                    document.getElementById('username')?.value ||
                    document.querySelector('input[placeholder*="username" i]')?.value ||
                    document.querySelector('input[type="text"]')?.value;
    
    const password = document.getElementById('signupPassword')?.value ||
                    document.getElementById('password')?.value ||
                    document.querySelector('input[placeholder*="password" i]')?.value ||
                    document.querySelector('input[type="password"]')?.value;
    
    const fullName = document.getElementById('fullName')?.value ||
                    document.querySelector('input[placeholder*="full name" i]')?.value ||
                    document.querySelector('input[placeholder*="name" i]')?.value;
    
    const email = document.getElementById('email')?.value ||
                  document.querySelector('input[type="email"]')?.value;
    
    const age = document.getElementById('age')?.value;
    const region = document.getElementById('region')?.value;
    
    console.log('📝 Signup data extracted:', { username, password, fullName, email, age, region });
    
    // Validation
    const missingFields = [];
    if (!username) missingFields.push('Username');
    if (!password) missingFields.push('Password');
    if (!fullName) missingFields.push('Full Name');
    
    if (missingFields.length > 0) {
        alert('Please fill in: ' + missingFields.join(', '));
        return;
    }
    
    if (!window.selectedUserType) {
        alert('Please select a user type');
        return;
    }
    
    // Show loading state
    const signupBtn = document.querySelector('.auth-btn, button[onclick*="signup"]');
    if (signupBtn) {
        const loading = signupBtn.querySelector('.btn-loading, .loading');
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
    
    console.log('📝 Sending registration data:', userData);
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
            console.log('🔧 Replaced login button onclick');
        }
    });
    
    // Signup buttons
    const signupButtons = document.querySelectorAll('[onclick*="signup"]');
    signupButtons.forEach(button => {
        if (button.getAttribute('onclick') === "signup()") {
            button.removeAttribute('onclick');
            button.addEventListener('click', signup);
            console.log('🔧 Replaced signup button onclick');
        }
    });
    
    // Show signup/login navigation
    const showSignupButtons = document.querySelectorAll('[onclick*="showSignup"]');
    const showLoginButtons = document.querySelectorAll('[onclick*="showLogin"]');
    
    showSignupButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', showSignup);
    });
    
    showLoginButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', showLogin);
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
        }
    });
}

function initializeForms() {
    // Set initial form states
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
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
            // Redirect to refresh the page and show logged-in state
            window.location.href = '/';
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
            // Redirect to refresh the page
            window.location.href = '/';
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
    const buttons = document.querySelectorAll('.auth-btn, button');
    buttons.forEach(button => {
        const loading = button.querySelector('.btn-loading, .loading');
        const text = button.querySelector('.btn-text');
        if (loading) loading.classList.add('hidden');
        if (text) {
            if (type === 'login') {
                text.textContent = 'Sign In';
            } else if (type === 'signup') {
                text.textContent = 'Create Account';
            }
        }
    });
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

// Update UI based on auth state
function updateUIBasedOnAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
        // User is logged in - hide auth forms, show user info
        const authForms = document.querySelector('.login-form, .signup-form, .login-container, .signup-container');
        if (authForms) authForms.style.display = 'none';
        
        // Show welcome message
        console.log('✅ User is logged in as:', user.fullName);
    }
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
        updateUIBasedOnAuth();
    }
});

console.log('✅ All functions loaded successfully');