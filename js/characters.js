// Characters Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Category Toggle
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const categoryList = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active class
            categoryList.classList.toggle('active');
            icon.classList.toggle('rotated');
            
            // Optional: Close other categories when one is opened
            if (categoryList.classList.contains('active')) {
                document.querySelectorAll('.category-list').forEach(list => {
                    if (list !== categoryList) {
                        list.classList.remove('active');
                        list.previousElementSibling.querySelector('i').classList.remove('rotated');
                    }
                });
            }
        });
    });
    
    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const characterItems = document.querySelectorAll('.character-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Apply filter
            characterItems.forEach(item => {
                item.classList.add('fade');
                
                setTimeout(() => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                    
                    setTimeout(() => {
                        item.classList.remove('fade');
                    }, 50);
                }, 300);
            });
        });
    });
    
    // Search Functionality
    const searchInput = document.getElementById('character-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        characterItems.forEach(item => {
            const characterName = item.querySelector('.character-name').textContent.toLowerCase();
            const characterAffiliation = item.querySelector('.character-affiliation').textContent.toLowerCase();
            
            item.classList.add('fade');
            
            setTimeout(() => {
                if (characterName.includes(searchTerm) || characterAffiliation.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
                
                setTimeout(() => {
                    item.classList.remove('fade');
                }, 50);
            }, 300);
        });
    });
    
    // Sidebar Link Click - Smooth Scroll to Character
    const sidebarLinks = document.querySelectorAll('.category-list a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // First ensure the character is visible (not filtered out)
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-filter="all"]').classList.add('active');
                
                characterItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                
                // Then scroll to it
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Highlight the character card temporarily
                targetElement.querySelector('.character-card').classList.add('highlight');
                setTimeout(() => {
                    targetElement.querySelector('.character-card').classList.remove('highlight');
                }, 2000);
            }
        });
    });
    
        // Load More Button
        const loadMoreBtn = document.querySelector('.load-more-btn');
        let currentlyShown = 8; // Initial visible characters (matches your current grid)
        const totalCharacters = characterItems.length;
        const increment = 4; // Characters to load per click
    
        // Initially hide characters beyond the first batch
        function updateVisibleCharacters() {
            characterItems.forEach((item, index) => {
                if (index < currentlyShown) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
    
            // Hide button if all characters are shown
            loadMoreBtn.style.display = currentlyShown >= totalCharacters ? 'none' : 'block';
        }
    
        // Initial setup
        updateVisibleCharacters();
    
        // Load more on button click
        loadMoreBtn.addEventListener('click', function() {
            currentlyShown = Math.min(currentlyShown + increment, totalCharacters);
            updateVisibleCharacters();
            
            // Smooth scroll to show newly loaded characters
            const lastVisible = document.querySelector(`.character-item:not(.hidden):last-child`);
            if (lastVisible) {
                lastVisible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

});