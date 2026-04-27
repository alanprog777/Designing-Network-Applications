const STORAGE_KEY = 'cards_data';

export function getCards() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return [
        { id: '1', title: 'Первая карточка', description: 'Это пример карточки. Вы можете её копировать или удалить.' },
        { id: '2', title: 'Важная заметка', description: 'Не забудьте протестировать копирование — появится "Копия1", "Копия2".' }
    ];
}

export function saveCards(cardsArray) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardsArray));
}
