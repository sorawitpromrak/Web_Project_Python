        // Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
        setTimeout(() => {
            loader.style.display = 'none';
    }, 1000);
});

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loader.style.display = 'none';
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});


