/**
 * Contact Form Validation
 * Handles form validation and submission for contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Initialize form validation
        initContactFormValidation();
    }
});

/**
 * Initialize Contact Form Validation
 */
function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');
    
    // Show error message
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.style.borderColor = '#ef4444';
        }
    }
    
    // Clear error message
    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.style.borderColor = '#e5e7eb';
        }
    }
    
    // Validate name field
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            return false;
        } else {
            clearError(nameInput);
            return true;
        }
    }
    
    // Validate email field
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }
    
    // Validate message field
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            return false;
        } else {
            clearError(messageInput);
            return true;
        }
    }
    
    // Validate subject field (optional)
    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject.length > 0 && subject.length < 5) {
            showError(subjectInput, 'Subject must be at least 5 characters if provided');
            return false;
        } else {
            clearError(subjectInput);
            return true;
        }
    }
    
    // Validate entire form
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isSubjectValid = validateSubject();
        
        return isNameValid && isEmailValid && isMessageValid && isSubjectValid;
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);
    subjectInput.addEventListener('blur', validateSubject);
    
    // Clear errors on input
    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
    subjectInput.addEventListener('input', () => clearError(subjectInput));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                newsletter: document.getElementById('newsletter').checked,
                timestamp: new Date().toISOString()
            };
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll simulate a successful submission
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
                
                // Show notification
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Log form data (in real app, this would be sent to a server)
                console.log('Form submitted with data:', formData);
                
            }, 1500);
        } else {
            // Show error notification
            showNotification('Please fix the errors in the form before submitting.', 'error');
        }
    });
}

/**
 * Show notification (reusing from main.js)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    const bgColors = {
        'success': '#10b981',
        'error': '#ef4444',
        'info': '#3b82f6',
        'warning': '#f59e0b'
    };
    
    notification.style.backgroundColor = bgColors[type] || bgColors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}