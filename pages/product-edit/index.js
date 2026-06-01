import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export const ProductEditPage = (root, id) => {
    root.innerHTML = `
        <div class="product-details-card edit-card-container">
            <h2 class="product-title" id="page-title">${id ? 'Редактирование услуги' : 'Добавление новой услуги'}</h2>

            <div class="form-group">
                <label class="form-label">Название чата:</label>
                <input type="text" id="input-title" class="search-input form-input" placeholder="Введите название...">
            </div>

            <div class="form-group">
                <label class="form-label">Описание:</label>
                <textarea id="input-text" class="search-input form-textarea" placeholder="Введите описание..."></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Количество участников:</label>
                <input type="number" id="input-members" class="search-input form-input" placeholder="0">
            </div>

            <hr>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="save-btn" class="btn-edit btn-full-width">Сохранить</button>
                <button id="back-btn" class="btn-detail btn-full-width">Назад к списку чатов</button>
            </div>
        </div>
    `;

    const titleInput = root.querySelector('#input-title');
    const textInput = root.querySelector('#input-text');
    const membersInput = root.querySelector('#input-members');

    // Загрузка данных для редактирования
    if (id) {
        ajax.get(stockUrls.getStockById(id), (product) => {
            if (product) {
                titleInput.value = product.title || '';
                textInput.value = product.text || '';
                membersInput.value = product.members || 0;
            }
        });
    }

    // Обработчик кнопки Сохранить
    root.querySelector('#save-btn').onclick = () => {
        const dataToSave = {
            title: titleInput.value,
            text: textInput.value,
            members: parseInt(membersInput.value) || 0
        };

        const onComplete = (response) => {
            window.location.hash = '#main';
        };

        if (id) {
            ajax.patch(stockUrls.updateStockById(id), dataToSave, onComplete);
        } else {
            ajax.post(stockUrls.createStock(), dataToSave, onComplete);
        }
    };

    root.querySelector('#back-btn').onclick = () => { window.location.hash = '#main'; };
};
