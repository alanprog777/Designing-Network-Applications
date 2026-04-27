export const ProductCard = (product, onClone, onDelete) => {
    const card = document.createElement('div');
    card.className = 'card-item';

    card.innerHTML = `
        <div class="clone-frame">
            ${product.isCopy ? `<span class="clone-count">Копия ${product.copyNum}</span>` : ''}
            <button class="btn-clone" title="Клонировать">+</button>
        </div>
        <h3 class="card-title">${product.name}</h3>
        <p>Услуга: ${product.service}</p>
        <p><em>${product.messagePreview}</em></p>
        <div style="margin-top: 20px;">
            <button class="btn-detail">Подробнее</button>
            <button class="btn-delete">Удалить</button>
        </div>
    `;

    card.querySelector('.btn-clone').onclick = () => onClone(product);
    card.querySelector('.btn-delete').onclick = () => onDelete(product.id);
    card.querySelector('.btn-detail').onclick = () => {
        window.location.hash = `#product?id=${product.id}`;
    };

    return card;
};
