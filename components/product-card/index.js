export const ProductCard = (product, onDelete) => {
    const card = document.createElement('div');
    card.className = 'card-item';

    card.innerHTML = `
        <h3 class="card-title">${product.title || 'Без названия'}</h3>
        <p>Участников: ${product.members || 0}</p>
        <p><em>${product.text || 'Нет описания'}</em></p>
        <div class="card-buttons-container">
            <button class="btn-detail">Подробнее</button>
            <button class="btn-edit">Редактировать</button>
            <button class="btn-delete">Удалить</button>
        </div>
    `;

    card.querySelector('.btn-delete').onclick = (e) => { e.stopPropagation(); onDelete(product.id); };
    card.querySelector('.btn-detail').onclick = () => { window.location.hash = `#product?id=${product.id}`; };
    card.querySelector('.btn-edit').onclick = () => { window.location.hash = `#product-edit?id=${product.id}`; };

    return card;
};
