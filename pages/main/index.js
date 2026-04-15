import { ProductCard } from '../../components/product-card/index.js';

let chatsData = [
    { id: 1, name: "Чат техподдержки", service: "Чаты", messagePreview: "Отправка сообщения админу..." },
    { id: 2, name: "Анонимный отдел", service: "Чаты", messagePreview: "Запрос на скрытую связь..." },
    { id: 3, name: "Бизнес консультант", service: "Чаты", messagePreview: "Сообщение по тарифу..." },
    { id: 4, name: "Общий канал связи", service: "Чаты", messagePreview: "Публичное уведомление..." }
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

    const render = (items) => {
        const grid = container.querySelector('#grid');
        grid.innerHTML = '';
        items.forEach(item => {
            grid.appendChild(ProductCard(
                item,
                (target) => {
                    const clone = { ...target, id: Date.now(), name: target.name + " (Копия)" };
                    chatsData.push(clone);
                    render(chatsData);
                },
                (id) => {
                    chatsData = chatsData.filter(c => c.id !== id);
                    render(chatsData);
                }
            ));
        });
    };

    container.querySelector('#filter').oninput = (e) => {
        const val = e.target.value.toLowerCase();
        render(chatsData.filter(c => c.name.toLowerCase().includes(val)));
    };

    render(chatsData);
    return container;
};
