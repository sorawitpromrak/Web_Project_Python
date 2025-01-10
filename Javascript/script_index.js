        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });



// Progress Bar Implementation
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const scrolled = (scrollPosition / totalScroll) * 100;
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${scrolled}%`;
    }
});  



        // Particle.js Configuration
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#3a86ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 2
                }
            }
        });


        // Custom Cursor
        const cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => cursor.classList.add('expand'));
        document.addEventListener('mouseup', () => cursor.classList.remove('expand'));


        // Statistics Counter Animation
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const updateCount = () => {
                if(current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
       
        // Scroll Progress
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.querySelector('.scroll-progress-bar').style.height = scrolled + '%';
        });


                // Mouse Trail Effect
                const createTrail = () => {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.opacity = '1';
                setTimeout(() => {
                    trail.remove();
                }, 500);
            }, 10);
        };

        document.addEventListener('mousemove', (e) => {
            const trail = createTrail();
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        });

        // Magnetic Buttons
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        // Page Transition
        const transitionPage = () => {
            const transition = document.querySelector('.page-transition');
            transition.style.transform = 'scaleY(1)';
            
            setTimeout(() => {
                transition.style.transform = 'scaleY(0)';
            }, 500);
        };

        // Trigger page transition on navigation
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                transitionPage();
            });
        });

                // Smooth scrolling for navigation links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        document.querySelector(this.getAttribute('href')).scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                });





        