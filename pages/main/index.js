export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 18rem; border-radius: 12px; overflow: hidden; background: white; border: 1px solid #e8e9ed;">
                <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 160px; object-fit: cover;">
                <div class="card-body" style="text-align: center; padding: 20px;">
                    <h5 class="card-title" style="color: #2c3e50; font-weight: bold;">${data.title}</h5>
                    <p class="card-text" style="color: #666; font-size: 14px;">${data.text}</p>
                    <button id="click-card-${data.id}" class="btn btn-primary w-100" style="background-color: #1da2bd; border: none; font-weight: bold;">
                        Перейти
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", listener);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
