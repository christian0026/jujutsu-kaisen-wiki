document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('7Kwf9Rkc38BdW1Oar');

    // 1. FILTER NEWS
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Toggle active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/Hide news items
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filter === 'all' || itemCategory === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 2. SEARCH NEWS
    const searchInput = document.getElementById('news-search');
    const searchButton = document.querySelector('.search-btn');

    function searchNews() {
        const searchText = searchInput.value.toLowerCase();

        newsItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            const content = item.querySelector('p').innerText.toLowerCase();

            if (title.includes(searchText) || content.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', searchNews);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchNews();
        }
    });

    // 3. LOAD MORE BUTTON
    const loadMoreButton = document.querySelector('.load-more-btn');
    let visibleItems = 6; // Show first 6 items initially

    function showVisibleItems() {
        newsItems.forEach((item, index) => {
            if (index < visibleItems) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    showVisibleItems(); // Initial call

    loadMoreButton.addEventListener('click', () => {
        visibleItems += 3; // Load 3 more each time
        showVisibleItems();

        // Hide button if all items are visible
        if (visibleItems >= newsItems.length) {
            loadMoreButton.style.display = 'none';
        }
    });

    // 4. NEWSLETTER SUBSCRIBE (EMAILJS)
    const newsletterForm = document.querySelector('.newsletter-form');

    newsletterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        emailjs.send('service_k4fqqnl', 'template_1jmra2y', {
            user_email: email
        })
        .then(function(response) {
            alert('✅ Subscription successful! Check your inbox.');
            emailInput.value = '';
        }, function(error) {
            alert('❌ Subscription failed. Please try again later.');
            console.error('EmailJS Error:', error);
        });
    });
});

