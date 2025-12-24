/**
 * Project Filtering
 * Handles filtering of projects by category
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering if on projects page
    if (document.querySelector('.projects-filter')) {
        initProjectFiltering();
    }
});

/**
 * Initialize Project Filtering
 */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter projects based on category
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                
                // Add animation for appearing
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const category = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(category);
            
            // Update URL hash (optional, for shareable filtered views)
            if (category !== 'all') {
                window.location.hash = `filter=${category}`;
            } else {
                window.location.hash = '';
            }
        });
    });
    
    // Check for filter in URL hash on page load
    function checkUrlFilter() {
        const hash = window.location.hash.substring(1);
        
        if (hash.startsWith('filter=')) {
            const category = hash.split('=')[1];
            const correspondingButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            
            if (correspondingButton) {
                correspondingButton.click();
            }
        }
    }
    
    // Check for filter on page load
    checkUrlFilter();
    
    // Add CSS for fadeIn animation
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .project-card {
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(animationStyles);
}