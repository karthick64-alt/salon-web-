// Dashboard JavaScript

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    updateGreeting();
    loadUserData();
});

// Initialize dashboard functions
function initializeDashboard() {
    // Check if user is logged in (in a real app, this would check session/token)
    // For now, we'll assume user is logged in if they're on the dashboard page
    console.log('Dashboard initialized');
}

// Setup event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Book Appointment button
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', function() {
            window.location.href = 'index.html#services';
        });
    }

    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });

    // Appointment action buttons
    const appointmentCancelBtns = document.querySelectorAll('.appointment-item .btn-icon[title="Cancel"]');
    appointmentCancelBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const appointmentItem = this.closest('.appointment-item');
            handleCancelAppointment(appointmentItem);
        });
    });

    const appointmentRescheduleBtns = document.querySelectorAll('.appointment-item .btn-icon[title="Reschedule"]');
    appointmentRescheduleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const appointmentItem = this.closest('.appointment-item');
            handleRescheduleAppointment(appointmentItem);
        });
    });

    // Book now buttons in favorites
    const bookNowBtns = document.querySelectorAll('.btn-book-sm');
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'index.html#services';
        });
    });

    // Navigation links
    const appointmentsLink = document.getElementById('appointmentsLink');
    if (appointmentsLink) {
        appointmentsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to appointments section (could be implemented as a modal or separate page)
            alert('Appointments page coming soon!');
        });
    }

    // Account dropdown is handled in script.js, but we can ensure it's active on dashboard
    const accountDropdown = document.querySelector('.nav-item-has-dropdown');
    if (accountDropdown && window.location.pathname.includes('dashboard.html')) {
        // Dashboard link should be active
        const dashboardLink = accountDropdown.querySelector('a[href="dashboard.html"]');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
        // Expand dropdown on dashboard page
        accountDropdown.classList.add('active');
    }
}

// Update greeting based on time of day
function updateGreeting() {
    const greetingElement = document.getElementById('userGreeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 17) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    // Get user name from localStorage or use default
    const userName = localStorage.getItem('userName') || 'Guest';
    const firstName = userName.split(' ')[0];
    
    greetingElement.textContent = `${greeting}, ${firstName}! Let's start your day`;
}

// Load user data (placeholder - in real app, this would fetch from API)
function loadUserData() {
    // This is a placeholder for loading user-specific data
    // In a real application, you would fetch this from an API
    const userData = {
        upcomingAppointments: 3,
        totalBookings: 12,
        favoriteServices: 5,
        pendingAppointments: 2
    };

    // Update stats if elements exist
    updateStats(userData);
}

// Update statistics
function updateStats(data) {
    const upcomingEl = document.getElementById('upcomingAppointments');
    const totalEl = document.getElementById('totalBookings');
    const favoritesEl = document.getElementById('favoriteServices');
    const pendingEl = document.getElementById('pendingAppointments');

    if (upcomingEl) upcomingEl.textContent = data.upcomingAppointments || 0;
    if (totalEl) totalEl.textContent = data.totalBookings || 0;
    if (favoritesEl) favoritesEl.textContent = data.favoriteServices || 0;
    if (pendingEl) pendingEl.textContent = data.pendingAppointments || 0;
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'Book Appointment':
            window.location.href = 'index.html#services';
            break;
        case 'Update Profile':
            alert('Profile update page coming soon!');
            break;
        case 'Rate Service':
            alert('Rating system coming soon!');
            break;
        case 'Contact Support':
            window.location.href = 'index.html#contact';
            break;
        default:
            console.log('Action:', action);
    }
}

// Handle cancel appointment
function handleCancelAppointment(appointmentItem) {
    const serviceName = appointmentItem.querySelector('.appointment-service').textContent;
    const date = appointmentItem.querySelector('.date-number').textContent;
    const month = appointmentItem.querySelector('.date-month').textContent;

    if (confirm(`Are you sure you want to cancel your appointment for ${serviceName} on ${month} ${date}?`)) {
        // Add animation
        appointmentItem.style.opacity = '0';
        appointmentItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            appointmentItem.remove();
            updateAppointmentCount();
            showNotification('Appointment cancelled successfully', 'success');
        }, 300);
    }
}

// Handle reschedule appointment
function handleRescheduleAppointment(appointmentItem) {
    const serviceName = appointmentItem.querySelector('.appointment-service').textContent;
    alert(`Rescheduling feature for ${serviceName} coming soon!`);
}

// Update appointment count after cancellation
function updateAppointmentCount() {
    const appointmentsList = document.getElementById('appointmentsList');
    if (!appointmentsList) return;

    const remainingAppointments = appointmentsList.querySelectorAll('.appointment-item').length;
    const upcomingEl = document.getElementById('upcomingAppointments');
    
    if (upcomingEl) {
        upcomingEl.textContent = remainingAppointments;
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        // Clear user session data (in real app)
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Show notification (reuse from auth.js if available, otherwise create one)
function showNotification(message, type = 'info') {
    // Check if notification function exists from auth.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }

    // Otherwise create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
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
        border-left: 4px solid ${type === 'success' ? '#00C851' : type === 'error' ? '#ff4444' : '#33b5e5'};
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" 
               style="color: ${type === 'success' ? '#00C851' : type === 'error' ? '#ff4444' : '#33b5e5'}; font-size: 20px;"></i>
            <span style="color: #333; font-size: 14px;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make showNotification available globally
window.showNotification = showNotification;
