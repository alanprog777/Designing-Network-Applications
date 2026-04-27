export const Footer = () => {
    const footer = document.createElement('footer');
    footer.className = 'main-footer';
    footer.innerHTML = `
        <div class="footer-container">
            <div class="info">
                <a href="#contacts">Контакты</a>
                <span class="separator">|</span>
                <a href="#PolCon">Политика конфиденциальности</a>
                <span class="separator">|</span>
                <a href="#Usl">Условия</a>
                <span class="separator">|</span>
                <a href="#Otp">Отписаться</a>
            </div>
        </div>
        <div class="adress">© 2025 www.costext.com</div>
    `;
    return footer;
};
