// Story page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Video controls for better user experience
    const storyVideo = document.querySelector('.story-hero-video');
    
    // Pause video when not in viewport for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                storyVideo.play();
            } else {
                storyVideo.pause();
            }
        });
    }, {threshold: 0.3});

    if (storyVideo) {
        videoObserver.observe(storyVideo);
    }
    
    // Animate timeline entries when they come into view
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    const entryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entryObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1, rootMargin: '0px 0px -100px 0px'});
    
    timelineEntries.forEach(item => {
        entryObserver.observe(item);
    });
    
    // Add active class to current nav link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navlist a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'story.html' || link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Add animation classes
document.addEventListener('DOMContentLoaded', function() {
    const addAnimationCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            .timeline-entry {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .timeline-entry.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .right-image.animate-in {
                transition-delay: 0.2s;
            }
            
            .active {
                color: #DF2626 !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    addAnimationCSS();
});