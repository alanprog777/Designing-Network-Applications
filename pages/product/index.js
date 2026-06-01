import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export const ProductPage = (root, id) => {
    ajax.get(stockUrls.getStockById(id), (product) => {
        if (!product) {
            root.innerHTML = `<p style="text-align:center;">Чат не найден</p>`;
            return;
        }

        root.innerHTML = `
            <div class="product-details-card">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-text">${product.text}</p>
                <p><strong>Участников:</strong> ${product.members}</p>
                <hr>
                <button id="back-btn" class="btn-detail btn-full-width">Назад</button>
            </div>
        `;

        root.querySelector('#back-btn').onclick = () => window.location.hash = '#main';
    });
};
