function toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    const toggleButton = document.querySelector('.navbar-toggler');
    const isExpanded = navbarCollapse.classList.contains('show');

    if (isExpanded) {
        navbarCollapse.classList.remove('show');
        toggleButton.classList.remove('open');
    } else {
        navbarCollapse.classList.add('show');
        toggleButton.classList.add('open');
    }

    toggleButton.setAttribute('aria-expanded', !isExpanded);
}

document.addEventListener('click', (event) => {
    const navbarCollapse = document.getElementById('navbarNav');
    const toggleButton = document.querySelector('.navbar-toggler');

    if (!toggleButton.contains(event.target) &&
        !navbarCollapse.contains(event.target) &&
        navbarCollapse.classList.contains('show')) {
        toggleNavbar();
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-link.active').classList.remove('active');
        this.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});