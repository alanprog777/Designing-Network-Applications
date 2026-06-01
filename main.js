import { Header } from './components/header/index.js';
import { Footer } from './components/footer/index.js';
import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';
import { SmsPage } from './pages/sms/index.js';
import { CalcPage } from './pages/calc/index.js';
import { AuthorPage } from './pages/author/index.js';

const app = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');

const renderPage = () => {
    const hash = window.location.hash || '#main';

    headerSlot.innerHTML = '';
    headerSlot.appendChild(Header(hash));

    footerSlot.innerHTML = '';
    footerSlot.appendChild(Footer());

    app.innerHTML = '';

    if (hash === '#main') {
        app.appendChild(MainPage());
    }
    else if (hash.startsWith('#product')) {
        app.appendChild(ProductPage());
    }
    else if (hash === '#sms') {
        app.appendChild(SmsPage());
    }
    else if (hash === '#calc') {
        app.appendChild(CalcPage());
    }
    else if (hash === '#author') {
        app.appendChild(AuthorPage());
    }
};

window.onhashchange = renderPage;
window.onload = renderPage;
