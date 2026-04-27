import { ProductCard } from '../../components/product-card/index.js';

const chatsData = [
    { id: 1, name: "Чат техподдержки", service: "Чаты", messagePreview: "Отправка сообщения админу...", originalName: "Чат техподдержки" },
    { id: 2, name: "Анонимный отдел", service: "Чаты", messagePreview: "Запрос на скрытую связь...", originalName: "Анонимный отдел" },
    { id: 3, name: "Бизнес консультант", service: "Чаты", messagePreview: "Сообщение по тарифу...", originalName: "Бизнес консультант" },
    { id: 4, name: "Общий канал связи", service: "Чаты", messagePreview: "Публичное уведомление...", originalName: "Общий канал связи" }
];

export const MainPage = () => {
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.textAlign = 'center';

    container.innerHTML = `
        <h2>Наши услуги: Чаты</h2>
        <input type="text" class="search-input" id="filter" placeholder="Поиск по названию чата...">
        <div class="cards-wrapper" id="grid"></div>
    `;

    const render = (filterVal = '') => {
        const grid = container.querySelector('#grid');
        grid.innerHTML = '';

        const filteredItems = chatsData.filter(c =>
            c.name.toLowerCase().includes(filterVal.toLowerCase())
        );

        filteredItems.forEach(item => {
            grid.appendChild(ProductCard(
                item,
                (target) => {
                    const original = target.originalName || target.name;
                    const copyNum = chatsData.filter(c => c.originalName === original).length;

                    chatsData.push({
                        ...target,
                        id: Date.now(),
                        name: original,
                        originalName: original,
                        isCopy: true,
                        copyNum: copyNum
                    });
                    render(container.querySelector('#filter').value);
                },
                (id) => {
                    const index = chatsData.findIndex(c => c.id === id);
                    if (index !== -1) {
                        chatsData.splice(index, 1);
                    }
                    render(container.querySelector('#filter').value);
                }
            ));
        });
    };

    container.querySelector('#filter').oninput = (e) => render(e.target.value);

    render();
    return container;
};
