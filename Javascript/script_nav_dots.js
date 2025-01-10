// Common elements and configurations
const sections = document.querySelectorAll('section');
const navDots = document.querySelectorAll('.nav-dot');
const navLinks = document.querySelectorAll('.nav-links a');
let isScrolling = false;

// Initialize the sections order based on navbar menu
const sectionOrder = ['home', 'portfolio', 'articles', 'exam', 'contact'];

// Helper function to get section boundaries
function getSectionBounds(section) {
    const rect = section.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY
    };
}

// Update both nav dots and navbar links
function updateNavigation() {
    if (isScrolling) return;

    const scrollCenter = window.scrollY + (window.innerHeight / 2);
    let activeSection = null;

    // Find the current active section
    sections.forEach(section => {
        const bounds = getSectionBounds(section);
        if (scrollCenter >= bounds.top && scrollCenter < bounds.bottom) {
            activeSection = section.id;
        }
    });

    if (activeSection) {
        // Update nav dots
        navDots.forEach(dot => {
            const isActive = dot.dataset.section === activeSection;
            dot.classList.toggle('active', isActive);
        });

        // Update navbar links
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeSection}`;
            link.classList.toggle('active', isActive);
        });
    }
}

// Throttle scroll event
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle scroll events
const throttledUpdate = throttle(updateNavigation, 100);
window.addEventListener('scroll', throttledUpdate);

// Handle nav dot clicks
navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        isScrolling = true;

        const targetId = dot.dataset.section;
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Update active states immediately
            navDots.forEach(d => d.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));

            // Set new active states
            dot.classList.add('active');
            document.querySelector(`a[href="#${targetId}"]`).classList.add('active');

            // Smooth scroll to target
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    });
});

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    updateNavigation();
}, 100));

