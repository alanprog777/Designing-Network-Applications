export const SmsPage = () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '100px';
    container.innerHTML = `
        <section class="sms-card">
            <h1 class="sms-title">Отправить анонимное СМС</h1>
            <p class="sms-status">100% анонимно</p>
            <div class="sms-form">
                <div class="input-box">
                    <label>Отправитель</label>
                    <div class="input">Анонимный</div>
                </div>
                <div class="input-box">
                    <label>Получатель</label>
                    <div class="input">+7</div>
                </div>
                <button class="sms-btn">Отправить СМС</button>
            </div>
        </section>
        <aside class="photo">
            <img src="img/android.jpg" alt="android" style="width: 600px; border-radius: 12px;">
        </aside>
    `;
    return container;
};
