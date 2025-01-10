document.addEventListener('DOMContentLoaded', () => {
    // Update footer year dynamically
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add scroll animation for footer
    const footer = document.querySelector('.footer-section');
    if (footer) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(footer);
    }

    // Add hover animations for contact items
    const contactItems = document.querySelectorAll('.footer-contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Add animations for skill icons
    const skillItems = document.querySelectorAll('.footer-skill-item');
    skillItems.forEach(skill => {
        const icon = skill.querySelector('.footer-skill-icon');
        if (icon) {
            skill.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'all 0.5s ease-in-out';
            });
            skill.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1)';
            });
        }
    });
});


// Your existing code
const skillItems = document.querySelectorAll('.skill-item');


// ---------------------------------------###################-----------------------------------

// Get all navigation elements
const sections = document.querySelectorAll('section');
const navDots = document.querySelectorAll('.nav-dot');
const navLinks = document.querySelectorAll('.nav-links a');
const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
const allNavigationLinks = document.querySelectorAll('a[href^="#"]');
let isScrolling = false;

// Initialize section order and coordinates
const sectionOrder = ['home', 'portfolio', 'articles', 'exam', 'contact'];
const sectionCoordinates = new Map();

// Update section coordinates
function updateSectionCoordinates() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        sectionCoordinates.set(section.id, {
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            height: rect.height
        });
    });
}

// Generic scroll handler for any navigation element
function handleNavigation(targetId, trigger = 'click') {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    isScrolling = true;

    // Update all navigation elements
    updateNavigationStates(targetId);

    // Smooth scroll to target
    const offset = trigger === 'click' ? 0 : 0; // Adjust if needed
    const targetPosition = sectionCoordinates.get(targetId).top + offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
        updateActiveSection();
    }, 1000);
}

// Update all navigation states
function updateNavigationStates(activeId) {
    // Update nav dots
    navDots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === activeId);
    });

    // Update all navigation links
    allNavigationLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', href === activeId);
    });
}

// Find and update active section on scroll
function updateActiveSection() {
    if (isScrolling) return;

    const scrollCenter = window.scrollY + (window.innerHeight / 2);
    let activeSection = null;

    // Find current active section
    sectionCoordinates.forEach((coords, id) => {
        if (scrollCenter >= coords.top && scrollCenter < coords.bottom) {
            activeSection = id;
        }
    });

    if (activeSection) {
        updateNavigationStates(activeSection);
    }
}

// Attach click handlers to all navigation elements
function attachNavigationHandlers() {
    allNavigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            handleNavigation(targetId);

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-links');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                document.querySelector('.menu-toggle').click();
            }
        });
    });

    // Nav dots click handler
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            handleNavigation(dot.dataset.section);
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        const currentSection = getCurrentSection();
        const currentIndex = sectionOrder.indexOf(currentSection);

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                if (currentIndex < sectionOrder.length - 1) {
                    handleNavigation(sectionOrder[currentIndex + 1], 'keyboard');
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                if (currentIndex > 0) {
                    handleNavigation(sectionOrder[currentIndex - 1], 'keyboard');
                }
                break;
            case 'Home':
                handleNavigation(sectionOrder[0], 'keyboard');
                break;
            case 'End':
                handleNavigation(sectionOrder[sectionOrder.length - 1], 'keyboard');
                break;
        }
    });
}

// Get current active section
function getCurrentSection() {
    const active = document.querySelector('.nav-dot.active');
    return active ? active.dataset.section : sectionOrder[0];
}

// Initialize everything
function initializeNavigation() {
    updateSectionCoordinates();
    attachNavigationHandlers();
    setupKeyboardNavigation();
    updateActiveSection();
}

// Event Listeners
window.addEventListener('load', initializeNavigation);
window.addEventListener('resize', throttle(() => {
    updateSectionCoordinates();
    updateActiveSection();
}, 100));
window.addEventListener('scroll', throttle(updateActiveSection, 100));

// Re-initialize on dynamic content changes
const observer = new MutationObserver(throttle(() => {
    updateSectionCoordinates();
    updateActiveSection();
}, 100));

observer.observe(document.body, {
    childList: true,
    subtree: true
});