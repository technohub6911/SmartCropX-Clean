console.log('🔧 Debug: script.js loaded');

// ==================== TEMPORARY SIGNUP DEBUG ====================

// Global signup function that will be called by onclick
window.signup = function() {
    console.log('🎯 SIGNUP FUNCTION CALLED!');
    console.trace('Stack trace for signup call');
    
    // Immediate feedback
    alert('🎯 Signup function is being called! Check console for next steps.');
    
    // Now call the actual signup logic
    executeSignup();
};

// Direct event listener for signup button
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 TEMP DEBUG: DOM loaded - setting up signup button listeners');
    
    // Find signup button by text content
    const allButtons = document.querySelectorAll('button, a, div, span');
    let signupButton = null;
    
    allButtons.forEach(btn => {
        const text = btn.textContent?.toLowerCase().trim();
        if (text.includes('sign up') || text.includes('create account') || text.includes('register')) {
            console.log('🔧 Found potential signup button:', btn);
            signupButton = btn;
            
            // Add direct click listener
            btn.addEventListener('click', function(e) {
                console.log('🎯 DIRECT CLICK on signup button:', this);
                e.preventDefault();
                e.stopPropagation();
                window.signup();
            });
        }
    });
    
    if (!signupButton) {
        console.error('🔧 No signup button found by text content');
        // Try by class
        const byClass = document.querySelector('.auth-btn, .signup-btn, .btn-primary');
        if (byClass) {
            console.log('🔧 Found signup button by class:', byClass);
            byClass.addEventListener('click', window.signup);
        }
    }
});

// ==================== ACTUAL SIGNUP LOGIC ====================

function executeSignup() {
    console.log('📝 EXECUTE SIGNUP: Starting signup process');
    
    // Debug: Show all form fields
    console.log('📝 Scanning for form inputs...');
    const allInputs = document.querySelectorAll('input, select, textarea');
    console.log('📝 Found inputs:', allInputs.length);
    
    allInputs.forEach((input, index) => {
        console.log(`📝 Input ${index}:`, {
            id: input.id,
            name: input.name,
            type: input.type,
            placeholder: input.placeholder,
            value: input.value,
            tagName: input.tagName
        });
    });
    
    // Try to find form data with multiple strategies
    const formData = extractFormData();
    console.log('📝 Extracted form data:', formData);
    
    // Validation
    if (!formData.username || !formData.password || !formData.fullName) {
        const missing = [];
        if (!formData.username) missing.push('Username');
        if (!formData.password) missing.push('Password');
        if (!formData.fullName) missing.push('Full Name');
        
        alert(`❌ Please fill in: ${missing.join(', ')}`);
        return;
    }
    
    if (!window.selectedUserType) {
        alert('❌ Please select a user type (Buyer/Seller/Both)');
        return;
    }
    
    // Show loading state
    showLoadingState('signup');
    
    // Prepare user data
    const userData = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email || '',
        age: formData.age ? parseInt(formData.age) : 25,
        region: formData.region || 'Unknown',
        userType: window.selectedUserType
    };
    
    console.log('📝 Final user data for registration:', userData);
    registerUser(userData);
}

function extractFormData() {
    const data = {};
    
    // Strategy 1: By ID
    data.username = document.getElementById('signupUsername')?.value ||
                   document.getElementById('username')?.value ||
                   document.getElementById('email')?.value;
    
    data.password = document.getElementById('signupPassword')?.value ||
                   document.getElementById('password')?.value;
    
    data.fullName = document.getElementById('fullName')?.value ||
                   document.getElementById('name')?.value;
    
    data.email = document.getElementById('email')?.value;
    data.age = document.getElementById('age')?.value;
    data.region = document.getElementById('region')?.value;
    
    // Strategy 2: By placeholder
    if (!data.username) {
        document.querySelectorAll('input').forEach(input => {
            const placeholder = input.placeholder?.toLowerCase() || '';
            if (placeholder.includes('username') || placeholder.includes('email')) {
                data.username = input.value;
            }
            if (placeholder.includes('password')) {
                data.password = input.value;
            }
            if (placeholder.includes('full name') || placeholder.includes('name')) {
                data.fullName = input.value;
            }
        });
    }
    
    // Strategy 3: By input type
    if (!data.username) {
        data.username = document.querySelector('input[type="text"]')?.value;
    }
    if (!data.password) {
        data.password = document.querySelector('input[type="password"]')?.value;
    }
    if (!data.email) {
        data.email = document.querySelector('input[type="email"]')?.value;
    }
    
    return data;
}

// ==================== FORM NAVIGATION FUNCTIONS ====================

function showSignup() {
    console.log('📝 Showing signup form');
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    
    console.log('📝 Switched to signup form');
}

function showLogin() {
    console.log('🔐 Showing login form');
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
    if (signupForm) signupForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    
    console.log('🔐 Switched to login form');
}

function selectUserType(element, userType) {
    console.log('👤 Selected user type:', userType);
    
    document.querySelectorAll('.user-type-option').forEach(opt => {
        opt.classList.remove('active');
        opt.style.backgroundColor = '';
    });
    
    element.classList.add('active');
    element.style.backgroundColor = '#4CAF50';
    element.style.color = 'white';
    
    window.selectedUserType = userType;
    console.log('👤 Stored user type:', userType);
}

// ==================== AUTH FUNCTIONS ====================

function login() {
    console.log('🔐 Login function called');
    
    const username = document.getElementById('username')?.value || 
                    document.querySelector('input[placeholder*="username" i]')?.value;
    
    const password = document.getElementById('password')?.value || 
                    document.querySelector('input[placeholder*="password" i]')?.value;
    
    console.log('🔐 Login attempt:', { username, password });
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    showLoadingState('login');
    loginUser(username, password);
}

// ==================== EVENT LISTENER SETUP ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Debug: DOM fully loaded');
    replaceInlineHandlers();
    initializeForms();
});

function replaceInlineHandlers() {
    // Login buttons
    const loginButtons = document.querySelectorAll('[onclick*="login"]');
    loginButtons.forEach(button => {
        if (button.getAttribute('onclick') === "login()") {
            button.removeAttribute('onclick');
            button.addEventListener('click', login);
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
    const loginForm = document.querySelector('.login-form, .login-container, [class*="login"]');
    const signupForm = document.querySelector('.signup-form, .signup-container, [class*="signup"]');
    
    if (loginForm && signupForm) {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
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
        
        resetButtonState('login');
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Login successful! Welcome ' + data.user.fullName);
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
        
        resetButtonState('signup');
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Registration successful! Welcome ' + data.user.fullName);
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

function showLoadingState(type) {
    const buttons = document.querySelectorAll('.auth-btn, button');
    buttons.forEach(button => {
        const text = button.querySelector('.btn-text');
        if (text) {
            if (type === 'login') {
                text.textContent = 'Signing in...';
            } else if (type === 'signup') {
                text.textContent = 'Creating Account...';
            }
        }
    });
}

function resetButtonState(type) {
    const buttons = document.querySelectorAll('.auth-btn, button');
    buttons.forEach(button => {
        const text = button.querySelector('.btn-text');
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

function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        console.log('🔐 User is logged in:', JSON.parse(user));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.href = '/';
}

function updateUIBasedOnAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
        const authForms = document.querySelector('.login-form, .signup-form, .login-container, .signup-container');
        if (authForms) authForms.style.display = 'none';
        console.log('✅ User is logged in as:', user.fullName);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
        updateUIBasedOnAuth();
    }
});

console.log('✅ All functions loaded successfully');