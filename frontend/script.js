console.log('🔧 Debug: script.js loaded');

// Login function for inline onclick
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
    
    // Call your existing loginUser function
    loginUser(username, password);
}

// Signup function for inline onclick
function signup() {
    console.log('📝 Signup function called');
    
    // Get signup form data
    const username = document.getElementById('signupUsername')?.value;
    const password = document.getElementById('signupPassword')?.value;
    const fullName = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    
    console.log('📝 Signup attempt:', { username, password, fullName, email });
    
    if (!username || !password || !fullName) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Call your existing registerUser function
    const userData = {
        username,
        password,
        fullName,
        email: email || '',
        age: 25, // Default age
        region: 'Unknown', // Default region
        userType: 'buyer' // Default user type
    };
    
    registerUser(userData);
}

// Wait for DOM to be fully ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Debug: DOM fully loaded');
    
    // Remove inline onclick handlers and replace with event listeners
    const loginButtons = document.querySelectorAll('[onclick*="login"]');
    const signupButtons = document.querySelectorAll('[onclick*="signup"]');
    
    loginButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', login);
        button.style.border = '3px solid blue';
        console.log('🔧 Replaced login button onclick');
    });
    
    signupButtons.forEach(button => {
        button.removeAttribute('onclick');
        button.addEventListener('click', signup);
        button.style.border = '3px solid orange';
        console.log('🔧 Replaced signup button onclick');
    });
    
    // Find ALL buttons and make them clickable
    const allButtons = document.querySelectorAll('button, [onclick], a.btn, input[type="submit"], .btn, [role="button"]');
    console.log('🔧 Debug: Found buttons:', allButtons.length);
    
    allButtons.forEach((button, index) => {
        console.log(`🔧 Debug: Button ${index}:`, button);
        console.log(`🔧 Debug: Button HTML:`, button.outerHTML);
        
        // Skip buttons we already handled
        if (!button.hasAttribute('onclick') || 
            (!button.getAttribute('onclick')?.includes('login') && 
             !button.getAttribute('onclick')?.includes('signup'))) {
            button.style.border = '3px solid green'; // Visual indicator
        }
        
        // Add click listener to EVERY button (except login/signup we already handled)
        if (!button.getAttribute('onclick')?.includes('login') && 
            !button.getAttribute('onclick')?.includes('signup')) {
            button.addEventListener('click', function(e) {
                console.log('🎯 BUTTON CLICKED:', this);
                console.log('🎯 Button text:', this.textContent || this.value || this.innerHTML);
                console.log('🎯 Button id:', this.id);
                console.log('🎯 Button classes:', this.className);
                e.preventDefault();
                e.stopPropagation();
                alert('Button clicked: ' + (this.textContent || this.value || this.innerHTML));
            });
        }
    });

    // Also check for form submissions
    const forms = document.querySelectorAll('form');
    console.log('🔧 Debug: Found forms:', forms.length);
    forms.forEach((form, index) => {
        form.addEventListener('submit', function(e) {
            console.log('📝 FORM SUBMITTED:', this);
            e.preventDefault();
            alert('Form submitted!');
        });
    });
});

// API functions
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
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Login successful! Welcome ' + data.user.fullName);
            // Redirect or update UI here
            return data;
        } else {
            alert('Login failed: ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('🔐 Login error:', error);
        alert('Login error: ' + error.message);
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
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Registration successful! Welcome ' + data.user.fullName);
            // Redirect or update UI here
            return data;
        } else {
            alert('Registration failed: ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('📝 Registration error:', error);
        alert('Registration error: ' + error.message);
        return null;
    }
}

// Keep your existing functions below...
// [Your existing API functions for products, AI detection, etc.]