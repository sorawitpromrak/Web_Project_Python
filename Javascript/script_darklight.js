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
                    document.body.classList.toggle('dark-mode');
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

new ThemeToggle();