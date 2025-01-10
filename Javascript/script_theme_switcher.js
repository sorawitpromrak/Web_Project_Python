        // Theme Switcher
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                document.documentElement.style.setProperty('--primary-color', option.style.background);
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });