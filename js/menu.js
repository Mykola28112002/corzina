(() => {
    const menuBtnRef = document.querySelector('[data-menu-btn]');
    const mobileMenuRef = document.querySelector('[data-menu]');
    menuBtnRef.addEventListener('click', () => {
        const expanded =
            menuBtnRef.getAttribute("aria-expended") === 'true' || false;
        menuBtnRef.classList.toggle('is-open');
        menuBtnRef.setAttribute('aria-expended', !expanded);
        document.body.classList.toggle('modal-open');
        mobileMenuRef.classList.toggle('is-open');
    });
})();