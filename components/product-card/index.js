export const ProductCard = (data, onClone, onDelete) => {
    const card = document.createElement('div');
    card.className = 'card-item';

    card.innerHTML = `
        <div class="clone-frame">
            <button class="btn-clone" title="Клонировать">+</button>
        </div>
        <h3 class="card-title">${data.name}</h3>
        <p style="color: #666;">Услуга: ${data.service}</p>
        <p style="font-size: 14px;">Заявка: ${data.messagePreview}</p>
        <div style="margin-top: 20px;">
            <button class="btn-detail">Подробнее</button>
            <button class="btn-delete">Удалить</button>
        </div>
    `;

    card.querySelector('.btn-detail').onclick = () => {
        window.location.hash = `product?id=${data.id}`;
    };

    card.querySelector('.btn-clone').onclick = () => onClone(data);
    card.querySelector('.btn-delete').onclick = () => onDelete(data.id);

    return card;
};
