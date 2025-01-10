class ThemeToggle {
    constructor() {
        this.container = document.getElementById('themeToggle');
        this.button = this.container.querySelector('.theme-btn');
        this.clickCount = 0;
        this.clickTimer = null;
        this.DOUBLE_CLICK_DELAY = 300;
        this.isDragging = false;
        this.position = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', this.handleClick.bind(this));
        this.container.addEventListener('mousedown', this.startDrag.bind(this));
        this.container.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
    }

    handleClick(e) {
        if (this.isDragging) return;
        this.clickCount++;
        
        if (!this.clickTimer) {
            this.clickTimer = setTimeout(() => {
                if (this.clickCount === 2) {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    
                    // Update particles color based on theme
                    if (window.pJSDom && window.pJSDom[0]) {
                        const particles = window.pJSDom[0].pJS.particles;
                        particles.color.value = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                        particles.line_linked.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                    }
                }
                this.clickCount = 0;
                this.clickTimer = null;
            }, this.DOUBLE_CLICK_DELAY);
        }
    }

    startDrag(e) {
        if (e.target.classList.contains('theme-btn')) return;
        
        this.isDragging = true;
        this.position.x = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.position.y = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

        const moveEvent = e.type === 'mousedown' ? 'mousemove' : 'touchmove';
        const endEvent = e.type === 'mousedown' ? 'mouseup' : 'touchend';

        document.addEventListener(moveEvent, this.drag.bind(this), { passive: false });
        document.addEventListener(endEvent, () => {
            this.isDragging = false;
            document.removeEventListener(moveEvent, this.drag.bind(this));
        }, { once: true });

        e.preventDefault();
    }

    drag(e) {
        if (!this.isDragging) return;

        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const deltaX = clientX - this.position.x;
        const deltaY = clientY - this.position.y;

        const newLeft = this.container.offsetLeft + deltaX;
        const newTop = this.container.offsetTop + deltaY;

        const maxX = window.innerWidth - this.container.offsetWidth;
        const maxY = window.innerHeight - this.container.offsetHeight;

        this.container.style.left = Math.min(Math.max(0, newLeft), maxX) + 'px';
        this.container.style.top = Math.min(Math.max(0, newTop), maxY) + 'px';

        this.position.x = clientX;
        this.position.y = clientY;

        e.preventDefault();
    }
}

// Initialize theme toggle
new ThemeToggle();

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('expand');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('expand');
});

// Mouse Trail Effect
function createTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    trail.style.opacity = '0.5';
    trail.style.transition = 'all 0.5s ease';

    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0.5)';
        setTimeout(() => {
            document.body.removeChild(trail);
        }, 500);
    }, 10);
}

document.addEventListener('mousemove', createTrail);

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Matrix Rain Effect
function createMatrixRain() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    const rainContainer = document.createElement('div');
    rainContainer.className = 'matrix-rain';
    document.body.appendChild(rainContainer);

    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = (i * 20) + 'px';
        column.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        rainContainer.appendChild(column);
    }
}

// Magnetic Field Effect
const particles = [];
function createMagneticField() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'magnetic-particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';// Continue from previous script...
        particle.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(particle);
        particles.push(particle);
    }
}

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3a86ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 3,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3a86ff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: ['grab', 'bubble']
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Neon Lines Effect
function createNeonLine(x, y) {
    const line = document.createElement('div');
    line.className = 'neon-line';
    
    const angle = Math.random() * Math.PI * 2;
    const length = Math.random() * 100 + 50;
    
    line.style.width = length + 'px';
    line.style.height = '2px';
    line.style.left = x + 'px';
    line.style.top = y + 'px';
    line.style.transform = `rotate(${angle}rad)`;
    
    document.body.appendChild(line);
    
    setTimeout(() => {
        document.body.removeChild(line);
    }, 2000);
}

// Update magnetic particles
document.addEventListener('mousemove', (e) => {
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
            const angle = Math.atan2(dy, dx);
            const force = (200 - distance) / 200;
            particle.style.transform = `translate(${Math.cos(angle) * force * 50}px, ${Math.sin(angle) * force * 50}px)`;
        } else {
            particle.style.transform = 'translate(0, 0)';
        }

        // Create neon lines occasionally
        if (Math.random() < 0.1) {
            createNeonLine(e.clientX, e.clientY);
        }
    });
});

// Vortex Effect
function createVortex(x, y) {
    const vortex = document.createElement('div');
    vortex.className = 'vortex';
    vortex.style.left = (x - 100) + 'px';
    vortex.style.top = (y - 100) + 'px';
    document.body.appendChild(vortex);
    
    vortex.addEventListener('animationend', () => {
        document.body.removeChild(vortex);
    });
}

// Portal Effect
function createPortal(x, y) {
    const portal = document.createElement('div');
    portal.className = 'portal';
    portal.style.left = (x - 50) + 'px';
    portal.style.top = (y - 50) + 'px';
    document.body.appendChild(portal);
    
    setTimeout(() => {
        portal.style.transform = 'scale(0)';
        portal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(portal);
        }, 300);
    }, 3000);
}

// Handle Click Effects
document.addEventListener('click', (e) => {
    createVortex(e.clientX, e.clientY);
    createPortal(e.clientX, e.clientY);
});

// Update Energy Field Position
function updateEnergyField(e) {
    const energyField = document.querySelector('.energy-field');
    if (energyField) {
        energyField.style.left = (e.clientX - 50) + 'px';
        energyField.style.top = (e.clientY - 50) + 'px';
    }
}

document.addEventListener('mousemove', updateEnergyField);

// Handle Window Resize
window.addEventListener('resize', () => {
    // Update matrix rain columns
    const rainContainer = document.querySelector('.matrix-rain');
    if (rainContainer) {
        rainContainer.remove();
        createMatrixRain();
    }

    // Update magnetic particles
    particles.forEach(particle => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
    });
});

// Handle Visibility Change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Initialize effects
createMatrixRain();
createMagneticField();

// Initialize with dark theme
document.documentElement.setAttribute('data-theme', 'dark');