import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';
import { SmsPage } from './pages/sms/index.js';
import { CalcPage } from './pages/calc/index.js';
import { AuthorPage } from './pages/author/index.js';

const style = document.createElement('style');
style.textContent = `
    body { font-family: Arial, sans-serif; margin: 0; background-color: #f4f7f9; display: flex; flex-direction: column; min-height: 100vh; }
    .main-header { background-color: #1da2bd; width: 100%; padding: 15px; display: flex; justify-content: center; }
    .container { width: 93%; display: flex; align-items: center; }
    .logo img { max-width: 180px; height: auto; display: block; }
    .menu { display: flex; flex-grow: 1; gap: 30px; }
    .left-menu { margin-left: 45%; display: flex; gap: 20px; align-items: center; }
    .left-menu a { color: white; text-decoration: none; font-size: 15px; }
    .left-menu a:hover { font-weight: bold; }
    .bold { font-weight: bold; }

    .main-footer { background-color: #b2bac376; width: 100%; height: 120px; flex-shrink: 0; margin-top: auto; }
    .footer-container { display: flex; flex-direction: column; align-items: center; gap: 15px; }
    .info { margin-top: 35px; display: flex; align-items: center; gap: 30px; }
    .info a { color: #43484d; font-size: 15px; text-decoration: underline; pointer-events: none; cursor: default; }
    .separator { color: #6c757d; font-size: 15px; }
    .adress { color: #0d0f10; font-size: 16px; text-align: center; margin-top: 20px; }

    #app { display: flex; flex-direction: column; align-items: center; padding: 40px 20px; flex-grow: 1}

    /* Стили карточек (оригинал) */
    .cards-wrapper { display: grid; grid-template-columns: repeat(2, 400px); gap: 30px; justify-content: center; margin-top: 30px; }
    .card-item { background: white; border: 1px solid #1da2bd; border-radius: 8px; padding: 20px; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .card-title { color: #1da2bd; margin-top: 0; font-size: 20px; }
    .btn-detail { background: #1da2bd; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
    .btn-delete { background: #ff5252; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-left: 10px; }
    .clone-frame { position: absolute; top: 15px; right: 15px; border: 1px solid #1da2bd; padding: 2px; border-radius: 4px; }
    .btn-clone { background: white; color: #1da2bd; border: 1px solid #1da2bd; cursor: pointer; font-weight: bold; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; border-radius: 2px; }
    .search-input { padding: 10px; width: 300px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 20px; }

    /* Стили СМС, Калькулятора и Автора (из твоего CSS) */
    .sms-card { background: #f8f9fa; width: 100%; max-width: 550px; padding: 40px; border: 1px solid #e8e9ed; border-radius: 12px; text-align: center; }
    .sms-title { color: #2c3e50; font-size: 32px; margin-bottom: 10px; }
    .sms-status { color: #1da2bd; font-size: 16px; margin-bottom: 30px; }
    .input-box { text-align: left; margin-bottom: 20px; }
    .input-box label { color: #666; font-weight: bold; display: block; margin-bottom: 8px; font-size: 14px; }
    .input { width: 100%; border: 1px solid #e0e0e0; padding: 12px; border-radius: 6px; color: #333; background: #fff; }
    .sms-btn { background-color: #1da2bd; color: white; width: 100%; padding: 15px; border: none; border-radius: 6px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .photo {mix-blend-mode: multiply; pointer-events: none;}

    .calculator-background { height: auto; background-color: #1da2bd; padding: 30px 20px 30px 20px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; }
    .row { display: flex; gap: 5px; justify-content: center;}
    .result { width: 100%; height: 60px; margin-bottom: 15px; background: #ffffff; color: #000000; font-size: 2.5rem; display: flex; align-items: center; justify-content: flex-end; padding: 0 10px; border-radius: 8px;}
    .my-btn { margin-right: 5px; margin-top: 5px; width: 50px; height: 50px; border-radius: 50%; border: none; background: #77f2f2; color: #01064a; font-size: 1.5rem; font-family: Arial, Helvetica, sans-serif; cursor: pointer; user-select: none;}
    .my-btn:hover {background: rgb(55, 148, 235);}
    .my-btn:active {filter: brightness(130%);}
    .my-btn.primary:hover {background: #cecdcd;}
    .my-btn.secondary {background: #ffffff;}
    .my-btn.secondary:hover {background: #cecdcd;}
    .my-btn.execute { width: 110px; border-radius: 34px; }

    .author-info { text-align: center; padding: 60px 20px; }
    .author-text, .author-head-text { color: #000000; font-size: 24px; }
`;
document.head.appendChild(style);

const renderLayout = (activeHash) => {
    document.getElementById('header-slot').innerHTML = `
    <header class="main-header">
        <div class="container">
            <div class="logo"><a href="#main"><img src="img/logo.png" alt="logo"></a></div>
            <div class="menu">
                <div class="left-menu">
                    <a href="#main" class="${activeHash === '#main' ? 'bold' : ''}">Домой (Чаты)</a>
                    <a href="#sms" class="${activeHash === '#sms' ? 'bold' : ''}">Отправить СМС</a>
                    <a href="#calc" class="${activeHash === '#calc' ? 'bold' : ''}">Калькулятор</a>
                    <a href="#author" class="${activeHash === '#author' ? 'bold' : ''}">Об авторе</a>
                </div>
            </div>
        </div>
    </header>`;

    document.getElementById('footer-slot').innerHTML = `
    <footer class="main-footer">
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
    </footer>`;
};

const router = () => {
    const app = document.getElementById('app');
    const hash = window.location.hash.split('?')[0] || '#main';
    app.innerHTML = '';
    renderLayout(hash);

    if (hash === '#main') app.appendChild(MainPage());
    else if (hash === '#product') app.appendChild(ProductPage());
    else if (hash === '#sms') app.appendChild(SmsPage());
    else if (hash === '#calc') app.appendChild(CalcPage());
    else if (hash === '#author') app.appendChild(AuthorPage());
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
