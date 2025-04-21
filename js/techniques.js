// News Page Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter news items
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('news-search');
    const searchButton = document.querySelector('.search-btn');

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Show all items if search term is empty
        if (!searchTerm) {
            newsItems.forEach(item => (item.style.display = 'block'));
            return;
        }

        newsItems.forEach(item => {
            const titleElement = item.querySelector('h3');
            const contentElement = item.querySelector('p');

            // Safely retrieve text content
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const content = contentElement ? contentElement.textContent.toLowerCase() : '';

            // Check if search term matches title or content
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Attach event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});