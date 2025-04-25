// Smooth reveal for sections as they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Detect when elements enter viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Observe technique application cards for staggered animation
    const applicationCards = document.querySelectorAll('.application-card');
    applicationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('slide-in-card');
        observer.observe(card);
    });
    
    // Handle parallax effect on domain expansion section
    const domainSection = document.querySelector('.domain-expansion');
    
    window.addEventListener('scroll', () => {
        if (isElementInViewport(domainSection)) {
            const scrollPosition = window.pageYOffset;
            const sectionTop = domainSection.offsetTop;
            const offset = (scrollPosition - sectionTop) * 0.4;
            
            domainSection.style.backgroundPosition = `center ${offset}px`;
        }
    });
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Add active class to links when scrolling to corresponding sections
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        // Check each section and update nav links accordingly
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});