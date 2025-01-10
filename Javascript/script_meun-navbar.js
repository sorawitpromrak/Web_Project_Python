        // Navbar Toggle
        function toggleNavbar() {
            const navbarCollapse = document.getElementById('navbarNav');
            const isExpanded = navbarCollapse.classList.contains('show');
            
            if (isExpanded) {
                navbarCollapse.classList.remove('show');
            } else {
                navbarCollapse.classList.add('show');
            }

            const toggleButton = document.querySelector('.navbar-toggler');
            toggleButton.setAttribute('aria-expanded', !isExpanded);
        }

           

            // Click outside to close navbar
            document.addEventListener('click', (event) => {
                const navbarCollapse = document.getElementById('navbarNav');
                const toggleButton = document.querySelector('.navbar-toggler');
                
                if (!toggleButton.contains(event.target) && 
                    !navbarCollapse.contains(event.target) && 
                    navbarCollapse.classList.contains('show')) {
                    toggleNavbar();
                }
            });


        // Active link handler
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-link.active').classList.remove('active');
                this.classList.add('active');
            });
        });