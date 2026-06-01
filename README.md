# Лабораторная работа 6: Знакомство с promise и fetch, борка клиентской части.
# Содержание

* [Цель работы](#цель-работы)
* [Задание](#задание)
    * [Основное задание](#основное-задание)
    * [Дополнительное задание](#дополнительное-задание)

## Цель работы
* Первая часть данной лабораторной работы заключается в изменении механизма взаимодействия с внешним API: в прошлой лабораторной работе использовался XMLHttpRequest, в этой - современный метод fetch. В ходе выполнения работы предстоит познакомиться с кратким полезным теоретическим материалом, кодом реализации простого взаимодействия с внешним API, получением данных и выводом их в интерфейс пользователя, и выполнить задания по варианту.
* Вторая часть лабораторной работы заключается в сборке клиентской части приложения: необходимо "сбилдить" клиентскую часть (ЛР №3) с помощью системы сборки, а также добавить в серверную часть (ЛР №4) возможность раздачи клиентской части в качестве статики во избежание проблем с CORS.
## Задание
## Основное задание
Продолжение Лабораторной работы 3: добавить страницу добавления/редактирования и соответствующие кнопки, подключение к созданному API бэкенду. Запросы XHR, Cors обойти через расширение браузера CORS Unblock.

Сайт, с которого был взят дизайн: https://www.costext.com/

Меняется логика файла ajax.js, добавляется vite.config.js и папка сборки проекта public
Структура проекта:

```
/index.html
/css/main.css
/components/
  /footer/index.js/
  /header/index.js/
  /product-card/index.js
/pages/
  /author/index.js/
  /product/index.js/
  /calc/index.js/
  /main/index.js/
  /sms/index.js/
/modules/
  /ajax.js/
  /stockUrls.js/
/my-api-service/
    /public/
        /assets/
            /index-C4EObNYF.css/
            /index-Dz8Bsw8i.js/
        /index.html/
    /src/
        /controllers/stocksControllers.js/
        /data/stocks.json/
        /routes/stocks.js/
        /services/fileService.js
        /services/stocksService.js
        /index.js/
    /package-lock.json/
    /package.json/
/index.html/
/main.js/
/package-lock.json/
```

ajax.js
```js
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка GET:', error);
            return null;
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка POST:', error);
            return null;
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка PATCH:', error);
            return null;
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка DELETE:', error);
            return null;
        }
    }
}

export const ajax = new Ajax();

```

Теперь после редактирования карточки можно сохранить изменения
```js
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export const ProductEditPage = async (root, id) => {
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

    if (id) {
        const product = await ajax.get(stockUrls.getStockById(id));
        if (product) {
            titleInput.value = product.title || '';
            textInput.value = product.text || '';
            membersInput.value = product.members || 0;
            root.querySelector('#page-title').innerText = `Редактирование услуги #${id}`;
        }
    }

    root.querySelector('#save-btn').onclick = async () => {
        const dataToSave = {
            title: titleInput.value,
            text: textInput.value,
            members: parseInt(membersInput.value) || 0
        };

        if (id) {
            await ajax.patch(stockUrls.updateStockById(id), dataToSave);
        } else {
            await ajax.post(stockUrls.createStock(), dataToSave);
        }

        window.location.hash = '#main';
    };

    root.querySelector('#back-btn').onclick = () => { window.location.hash = '#main'; };
};
```
До редактирования:
![alt text](image.png)
После:
![alt text](image-1.png)

Файл vite.config.js
```js
export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
};

```
В браузер мы отправляем fetch-запросы:
![alt text](image-2.png)

## Дополнительное задание

Ответить на теоретические вопросы преподавателя
