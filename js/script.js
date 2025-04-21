// Video controls for better user experience
const featuredVideo = document.querySelector('.featured-video-player');
    
// Pause video when not in viewport for performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            featuredVideo.play();
        } else {
            featuredVideo.pause();
        }
    });
}, {threshold: 0.5});

observer.observe(featuredVideo);

// Add click to unmute functionality
featuredVideo.addEventListener('click', () => {
    featuredVideo.muted = !featuredVideo.muted;
    // You could add a mute/unmute icon toggle here
});