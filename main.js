import { MainPage } from './pages/main/index.js';
import { ProductPage } from './pages/product/index.js';

const app = document.getElementById('app');

const renderPage = () => {
    const hash = window.location.hash || '#main';
    if (hash === '#main') {
        MainPage(app);
    } else if (hash.startsWith('#product')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const id = urlParams.get('id');
        ProductPage(app, id);
    }
};

window.onhashchange = renderPage;
window.onload = renderPage;
