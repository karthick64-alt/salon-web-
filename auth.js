// Password toggle functionality
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Password strength checker for register page
const registerPassword = document.getElementById('registerPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

if (registerPassword && strengthFill && strengthText) {
    registerPassword.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let strengthLabel = '';
        let strengthClass = '';

        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;

        if (password.length === 0) {
            strengthLabel = 'Password strength';
            strengthClass = '';
        } else if (strength <= 1) {
            strengthLabel = 'Weak';
            strengthClass = 'weak';
        } else if (strength === 2) {
            strengthLabel = 'Medium';
            strengthClass = 'medium';
        } else {
            strengthLabel = 'Strong';
            strengthClass = 'strong';
        }

        strengthFill.className = 'strength-fill ' + strengthClass;
        strengthText.textContent = strengthLabel;
    });
}

// Form validation and submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate login (replace with actual API call)
        console.log('Login attempt:', { email, password });
        
        // Show success message
        showNotification('Login successful! Redirecting...', 'success');
        
        // Save user email to localStorage (for greeting)
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Get form data
        const formData = {
            firstName: document.getElementById('registerFirstName').value,
            lastName: document.getElementById('registerLastName').value,
            email: document.getElementById('registerEmail').value,
            phone: document.getElementById('registerPhone').value,
            password: password
        };
        
        // Save user name to localStorage for dashboard greeting
        const fullName = `${formData.firstName} ${formData.lastName}`;
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', formData.email);
        
        // Simulate registration (replace with actual API call)
        console.log('Registration attempt:', formData);
        
        // Show success message
        showNotification('Account created successfully! Redirecting to login...', 'success');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #00C851;
    }
    
    .notification-error {
        border-left: 4px solid #ff4444;
    }
    
    .notification-info {
        border-left: 4px solid #33b5e5;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-content i {
        font-size: 20px;
    }
    
    .notification-success .notification-content i {
        color: #00C851;
    }
    
    .notification-error .notification-content i {
        color: #ff4444;
    }
    
    .notification-info .notification-content i {
        color: #33b5e5;
    }
    
    .notification-content span {
        color: #333;
        font-size: 14px;
    }
`;
document.head.appendChild(style);

