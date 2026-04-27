export const Header = (activeHash) => {
    const header = document.createElement('header');
    header.className = 'main-header';
    header.innerHTML = `
        <div class="container">
            <div class="logo">
                <a href="#main"><img src="img/logo.png" alt="logo"></a>
            </div>
            <div class="menu">
                <div class="left-menu">
                    <a href="#main" class="${activeHash === '#main' ? 'bold' : ''}">Домой (Чаты)</a>
                    <a href="#sms" class="${activeHash === '#sms' ? 'bold' : ''}">Отправить СМС</a>
                    <a href="#calc" class="${activeHash === '#calc' ? 'bold' : ''}">Калькулятор</a>
                    <a href="#author" class="${activeHash === '#author' ? 'bold' : ''}">Об авторе</a>
                </div>
            </div>
        </div>
    `;
    return header;
};
