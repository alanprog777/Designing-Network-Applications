import { ProductCard } from '../../components/product-card/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export const MainPage = (root) => {
    let currentData = [];

    const getData = () => {
        ajax.get(stockUrls.getStocks(), (data) => {
            currentData = Array.isArray(data) ? data : [];
            render();
        });
    };

    const render = () => {
        const filterInput = root.querySelector('#filter');
        const filterVal = filterInput ? filterInput.value : "";

        root.innerHTML = `
            <div class="main-page-container">
                <h2>Наши услуги: Чаты</h2>
                <div class="main-controls">
                    <input type="text" class="search-input" id="filter" placeholder="Поиск по названию...">
                    <button id="add-btn" class="btn-detail btn-add-chat">Добавить чат</button>
                </div>
                <div class="cards-wrapper" id="grid"></div>
            </div>
        `;

        const grid = root.querySelector('#grid');
        const input = root.querySelector('#filter');
        input.value = filterVal;
        input.focus();

        currentData
            .filter(item => {
                const nameToFilter = (item.title || "").toString();
                return nameToFilter.toLowerCase().includes(filterVal.toLowerCase());
            })
            .forEach(item => {
                grid.appendChild(ProductCard(item, deleteItem));
            });

        input.oninput = () => render();
        root.querySelector('#add-btn').onclick = () => { window.location.hash = '#product-edit'; };
    };

    const deleteItem = (id) => {
        ajax.delete(stockUrls.removeStockById(id), () => {
            getData();
        });
    };

    getData();
};
