export const ProductPage = () => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');

    const descriptions = {
        "1": "Этот чат предназначен для прямой связи с дежурным инженером Costext. Время ответа составляет не более 5 минут. Все сообщения логируются для безопасности.",
        "2": "Анонимный шлюз. Ваши данные не сохраняются на сервере после закрытия сессии. Идеально для разовых конфиденциальных запросов.",
        "3": "Приоритетный канал для корпоративных клиентов. Позволяет отправлять сообщения сразу всей группе менеджеров вашего проекта.",
        "4": "Общий чат для информационных рассылок. Здесь вы можете увидеть статус системы и последние обновления сервиса в реальном времени."
    };

    const text = descriptions[id] || "Это клонированная услуга. Она полностью наследует параметры родительского чата, но создана для новой независимой заявки.";

    const page = document.createElement('div');
    page.className = 'product-details-card';

    page.innerHTML = `
        <h2 class="product-title">Детали услуги #${id}</h2>

        <div id="model-container"></div>

        <div class="controls-panel">
            <button class="view-btn" onclick="setCameraView('front')">Спереди</button>
            <button class="view-btn" onclick="setCameraView('side')">Сбоку</button>
            <button class="view-btn" onclick="setCameraView('top')">Сверху</button>
        </div>

        <p class="product-text" style="margin-top: 20px;">${text}</p>
        <hr class="product-divider">
        <button id="back-btn" class="btn-detail btn-full-width">Назад к списку чатов</button>
    `;

    page.querySelector('#back-btn').onclick = () => {
        window.location.hash = '#main';
    };

    return page;
};
