export const AuthorPage = () => {
    const container = document.createElement('div');
    container.className = 'author-info';
    container.innerHTML = `
        <details class="author-text">
            <summary>Об авторе</summary>
            <p class="author-name">Али Алан ИУ5-46Б</p>
        </details>
    `;
    return container;
};
