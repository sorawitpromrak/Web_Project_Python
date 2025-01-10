class AdaptiveTextColor {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      this.title = this.container.querySelector('.adaptive-container__title');
      this.backgroundElement = this.container.querySelector('.adaptive-container__background');
      
      this.init();
    }

    calculateLuminance(r, g, b) {
      const [rr, gg, bb] = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
    }

    updateTextColor() {
      const style = window.getComputedStyle(this.backgroundElement);
      const [r, g, b] = style.backgroundColor.match(/\d+/g).map(Number);
      const luminance = this.calculateLuminance(r, g, b);
      
      this.title.setAttribute('data-theme', luminance > 0.5 ? 'light' : 'dark');
    }

    init() {
      this.updateTextColor();

      // สังเกตการเปลี่ยนแปลงของสีพื้นหลัง
      new MutationObserver(() => this.updateTextColor()).observe(this.backgroundElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // สังเกตการเปลี่ยนแปลงของ CSS Variables ถ้ามี
      window.matchMedia('(prefers-color-scheme: dark)').addListener(() => this.updateTextColor());
    }
  }

  // เริ่มต้นใช้งาน
  document.addEventListener('DOMContentLoaded', () => {
    new AdaptiveTextColor('.adaptive-container__wrapper');
  });


  