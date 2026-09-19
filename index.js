/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

document.querySelectorAll('[data-panel]').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const panel = document.getElementById(trigger.dataset.panel);
        if (!panel) return;
        panel.hidden = false;
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.artwork-panel').forEach(panel => {
    const close = () => {
        panel.hidden = true;
        document.body.style.overflow = '';
    };
    panel.querySelector('.artwork-panel__close').addEventListener('click', close);
    panel.addEventListener('click', e => { if (e.target === panel) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !panel.hidden) close();
    });
});