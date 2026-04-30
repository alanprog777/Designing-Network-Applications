import { Header } from './components/header/index.js';
import { Footer } from './components/footer/index.js';
import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';
import { SmsPage } from './pages/sms/index.js';
import { CalcPage } from './pages/calc/index.js';
import { AuthorPage } from './pages/author/index.js';

const router = () => {
    const app = document.getElementById('app');
    const headerSlot = document.getElementById('header-slot');
    const footerSlot = document.getElementById('footer-slot');

    const hash = window.location.hash.split('?')[0] || '#main';

    headerSlot.innerHTML = '';
    headerSlot.appendChild(Header(hash));

    app.innerHTML = '';
    if (hash === '#main') app.appendChild(MainPage());
    else if (hash === '#product') app.appendChild(ProductPage());
    else if (hash === '#sms') app.appendChild(SmsPage());
    else if (hash === '#calc') app.appendChild(CalcPage());
    else if (hash === '#author') app.appendChild(AuthorPage());

    footerSlot.innerHTML = '';
    footerSlot.appendChild(Footer());
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
