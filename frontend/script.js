console.log('🔧 Debug: script.js loaded');

// Wait for DOM to be fully ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Debug: DOM fully loaded');
    
    // Find ALL buttons and make them clickable
    const allButtons = document.querySelectorAll('button, [onclick], a.btn, input[type="submit"], .btn, [role="button"]');
    console.log('🔧 Debug: Found buttons:', allButtons.length);
    
    allButtons.forEach((button, index) => {
        console.log(`🔧 Debug: Button ${index}:`, button);
        console.log(`🔧 Debug: Button HTML:`, button.outerHTML);
        button.style.border = '3px solid green'; // Visual indicator
        
        // Remove any existing click handlers first
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('button, [onclick], a.btn, input[type="submit"], .btn, [role="button"]')[index];
        
        // Add click listener to EVERY button
        newButton.addEventListener('click', function(e) {
            console.log('🎯 BUTTON CLICKED:', this);
            console.log('🎯 Button text:', this.textContent || this.value || this.innerHTML);
            console.log('🎯 Button id:', this.id);
            console.log('🎯 Button classes:', this.className);
            e.preventDefault();
            e.stopPropagation();
            alert('Button clicked: ' + (this.textContent || this.value || this.innerHTML));
        });
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

// API functions (keep your existing API code below)
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
            alert('Login successful!');
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
            alert('Registration successful!');
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