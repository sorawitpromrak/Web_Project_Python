        // Typed.js configuration with callbacks
let typingStatus = document.querySelector('.status-text');

new Typed('.typed-text', {
    strings: [
        'Web Developer',
        'UI/UX Designer',
        'Frontend Expert',
        'Creative Coder',
        'IT Consulting',
        'Software Engineer',
        'System Analyst',
        'IT Engineer',
    ],
    typeSpeed: 160,
    backSpeed: 100,
    loop: true,
    cursorChar: '',
    fadeOut: true,
    fadeOutDelay: 500,
    showCursor: false,
    onStart: (self) => {
        typingStatus.textContent = 'Typing...';
    },
    onStop: (self) => {
        typingStatus.textContent = 'Stopped';
    },
    onReset: (self) => {
        typingStatus.textContent = 'Reset';
    },
    preStringTyped: (arrayPos, self) => {
        document.querySelector('.typed-text').style.color = getRandomColor();
    }
});

// Function to generate random colors (for variation)
function getRandomColor() {
    const colors = [
        '#eceff1', // BlueGrey
        '#ffeb3b', // yellow
        '#76ff03', // lightGreen
        '#ffab40', // Orange
        '#5d4037',  // brown
        '#ffffff',  // White 
        '#000000'  // Black
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add dynamic hover effect
const typedText = document.querySelector('.typed-text');
typedText.addEventListener('mouseover', () => {
    typedText.style.transform = 'scale(1.05)';
    typedText.style.textShadow = '3px 3px 6px rgba(0,0,0,0.3)';
});

typedText.addEventListener('mouseout', () => {
    typedText.style.transform = 'scale(1)';
    typedText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.2)';
});