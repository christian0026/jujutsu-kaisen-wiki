// Initialize EmailJS
(function() {
    //EmailJS public key
    emailjs.init("7Kwf9Rkc38BdW1Oar");
})();

// DOM Elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');
const formMessage = document.getElementById('form-message');
const spinner = document.getElementById('spinner');
const submitBtn = document.querySelector('.submit-btn .btn-text');
const faqQuestions = document.querySelectorAll('.faq-question');

// Validate Form Fields
function validateName() {
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validateSubject() {
    if (subjectInput.value === '') {
        subjectError.textContent = 'Please select a subject';
        return false;
    } else {
        subjectError.textContent = '';
        return true;
    }
}

function validateMessage() {
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        return false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

// Add event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
subjectInput.addEventListener('change', validateSubject);
messageInput.addEventListener('input', validateMessage);

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show loading spinner
        spinner.style.display = 'block';
        submitBtn.style.opacity = '0';
        
        // Prepare form data for EmailJS
        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject: subjectInput.value,
            message: messageInput.value.trim(),
            newsletter: document.getElementById('newsletter').checked ? 'Yes' : 'No'
        };
        
        // Send email using EmailJS
        emailjs.send('service_k4fqqnl', 'template_1jmra2y', templateParams)
            .then(function(response) {
                // Hide loading spinner
                spinner.style.display = 'none';
                submitBtn.style.opacity = '1';
                
                // Show success message
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.className = 'form-message success';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Hide loading spinner
                spinner.style.display = 'none';
                submitBtn.style.opacity = '1';
                
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.className = 'form-message error';
                
                // Hide error message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
                
                console.error('EmailJS error:', error);
            });
    }
});

// FAQ Accordion functionality
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Toggle active class on the clicked question
        question.classList.toggle('active');
        
        // Close other open questions
        faqQuestions.forEach(item => {
            if (item !== question && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

// Add visual feedback for form inputs
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Add animation for page elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const fadeInElements = document.querySelectorAll('.contact-info, .contact-form-container, .faq-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});