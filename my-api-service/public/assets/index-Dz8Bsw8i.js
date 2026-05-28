(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const p=n=>{const t=document.createElement("header");return t.className="main-header",t.innerHTML=`
        <div class="container">
            <div class="logo">
                <a href="#main"><img src="assets/img/logo.png" alt="logo"></a>
            </div>
            <div class="menu">
                <div class="left-menu">
                    <a href="#main" class="${n==="#main"?"bold":""}">Домой (Чаты)</a>
                    <a href="#sms" class="${n==="#sms"?"bold":""}">Отправить СМС</a>
                    <a href="#calc" class="${n==="#calc"?"bold":""}">Калькулятор</a>
                    <a href="#author" class="${n==="#author"?"bold":""}">Об авторе</a>
                </div>
            </div>
        </div>
    `,t},m=()=>{const n=document.createElement("footer");return n.className="main-footer",n.innerHTML=`
        <div class="footer-container">
            <div class="info">
                <a href="#contacts">Контакты</a>
                <span class="separator">|</span>
                <a href="#PolCon">Политика конфиденциальности</a>
                <span class="separator">|</span>
                <a href="#Usl">Условия</a>
                <span class="separator">|</span>
                <a href="#Otp">Отписаться</a>
            </div>
        </div>
        <div class="adress">© 2025 www.costext.com</div>
    `,n},f=(n,t)=>{const e=document.createElement("div");return e.className="card-item",e.innerHTML=`
        <h3 class="card-title">${n.title||"Без названия"}</h3>
        <p>Участников: ${n.members||0}</p>
        <p><em>${n.text||"Нет описания"}</em></p>
        <div class="card-buttons-container">
            <button class="btn-detail">Подробнее</button>
            <button class="btn-edit">Редактировать</button>
            <button class="btn-delete">Удалить</button>
        </div>
    `,e.querySelector(".btn-delete").onclick=a=>{a.stopPropagation(),t(n.id)},e.querySelector(".btn-detail").onclick=()=>{window.location.hash=`#product?id=${n.id}`},e.querySelector(".btn-edit").onclick=()=>{window.location.hash=`#product-edit?id=${n.id}`},e};class h{async get(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`Ошибка HTTP: ${e.status}`);return await e.json()}catch(e){return console.error("Ошибка GET:",e),null}}async post(t,e){try{const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok)throw new Error(`Ошибка HTTP: ${a.status}`);return await a.json()}catch(a){return console.error("Ошибка POST:",a),null}}async patch(t,e){try{const a=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!a.ok)throw new Error(`Ошибка HTTP: ${a.status}`);return await a.json()}catch(a){return console.error("Ошибка PATCH:",a),null}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});if(!e.ok)throw new Error(`Ошибка HTTP: ${e.status}`);return await e.json()}catch(e){return console.error("Ошибка DELETE:",e),null}}}const l=new h;class y{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const d=new y,v=n=>{let t=[];const e=async()=>{const o=await l.get(d.getStocks());t=Array.isArray(o)?o:[],s()},a=async o=>{await l.delete(d.removeStockById(o)),e()},s=()=>{const o=n.querySelector("#filter"),c=o?o.value:"";n.innerHTML=`
            <div class="main-page-container">
                <h2>Наши услуги: Чаты</h2>
                <div class="main-controls">
                    <input type="text" class="search-input" id="filter" placeholder="Поиск по названию...">
                    <button id="add-btn" class="btn-detail btn-add-chat">Добавить чат</button>
                </div>
                <div class="cards-wrapper" id="grid"></div>
            </div>
        `;const i=n.querySelector("#grid"),r=n.querySelector("#filter");r.value=c,r.focus(),t.filter(u=>(u.title||"").toString().toLowerCase().includes(c.toLowerCase())).forEach(u=>{i.appendChild(f(u,a))}),r.oninput=()=>s(),n.querySelector("#add-btn").onclick=()=>{window.location.hash="#product-edit"}};e()},g=async(n,t)=>{const e=await l.get(d.getStockById(t));if(!e){n.innerHTML='<p style="text-align:center;">Чат не найден</p>';return}n.innerHTML=`
        <div class="product-details-card">
            <h2 class="product-title">${e.title}</h2>
            <p class="product-text">${e.text}</p>
            <p><strong>Участников:</strong> ${e.members}</p>
            <hr>
            <button id="back-btn" class="btn-detail btn-full-width">Назад</button>
        </div>
    `,n.querySelector("#back-btn").onclick=()=>window.location.hash="#main"},w=async(n,t)=>{n.innerHTML=`
        <div class="product-details-card edit-card-container">
            <h2 class="product-title" id="page-title">${t?"Редактирование услуги":"Добавление новой услуги"}</h2>

            <div class="form-group">
                <label class="form-label">Название чата:</label>
                <input type="text" id="input-title" class="search-input form-input" placeholder="Введите название...">
            </div>

            <div class="form-group">
                <label class="form-label">Описание:</label>
                <textarea id="input-text" class="search-input form-textarea" placeholder="Введите описание..."></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Количество участников:</label>
                <input type="number" id="input-members" class="search-input form-input" placeholder="0">
            </div>

            <hr>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="save-btn" class="btn-edit btn-full-width">Сохранить</button>
                <button id="back-btn" class="btn-detail btn-full-width">Назад к списку чатов</button>
            </div>
        </div>
    `;const e=n.querySelector("#input-title"),a=n.querySelector("#input-text"),s=n.querySelector("#input-members");if(t){const o=await l.get(d.getStockById(t));o&&(e.value=o.title||"",a.value=o.text||"",s.value=o.members||0,n.querySelector("#page-title").innerText=`Редактирование услуги #${t}`)}n.querySelector("#save-btn").onclick=async()=>{const o={title:e.value,text:a.value,members:parseInt(s.value)||0};t?await l.patch(d.updateStockById(t),o):await l.post(d.createStock(),o),window.location.hash="#main"},n.querySelector("#back-btn").onclick=()=>{window.location.hash="#main"}},_=()=>{const n=document.createElement("div");return n.className="sms-page-container",n.innerHTML=`
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
            <img src="assets/img/android.jpg" alt="android" class="android-img">
        </aside>
    `,n},S=()=>{const n=document.createElement("section");return n.innerHTML=`
        <div class="calculator-background">
            <div id="result" class="result">0</div>
            <div class="row">
                <button id="btn_op_clear" class="my-btn secondary">C</button>
                <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                <button id="btn_op_percent" class="my-btn secondary">%</button>
                <button id="btn_op_div" class="my-btn primary">/</button>
            </div>
            <div class="row">
                <button id="btn_digit_7" class="my-btn">7</button>
                <button id="btn_digit_8" class="my-btn">8</button>
                <button id="btn_digit_9" class="my-btn">9</button>
                <button id="btn_op_mult" class="my-btn primary">x</button>
            </div>
            <div class="row">
                <button id="btn_digit_4" class="my-btn">4</button>
                <button id="btn_digit_5" class="my-btn">5</button>
                <button id="btn_digit_6" class="my-btn">6</button>
                <button id="btn_op_minus" class="my-btn primary">-</button>
            </div>
            <div class="row">
                <button id="btn_digit_1" class="my-btn">1</button>
                <button id="btn_digit_2" class="my-btn">2</button>
                <button id="btn_digit_3" class="my-btn">3</button>
                <button id="btn_op_plus" class="my-btn primary">+</button>
            </div>
            <div class="row">
                <button id="btn_digit_0" class="my-btn">0</button>
                <button id="btn_digit_dot" class="my-btn">.</button>
                <button id="btn_op_equal" class="my-btn execute">=</button>
            </div>
        </div>
    `,setTimeout(()=>{let t="",e="",a=null;const s=n.querySelector("#result"),o=n.querySelectorAll('[id ^= "btn_digit_"]');function c(i){if(a)e==="Infinity"||e==="-Infinity"||e==="NaN"?e=i==="."?"0.":i:e===""&&i==="."?e="0.":i!=="."?e.length>=8?e!==""&&e!=="-"&&(e=parseFloat(e).toExponential(2)):e+=i:e.includes(".")||(e+=e===""||e==="-"?"0.":"."),s.innerHTML=e;else{if(t.includes("e"))return;t==="Infinity"||t==="-Infinity"||t==="NaN"?t=i==="."?"0.":i:t===""&&i==="."?t="0.":i!=="."?t.length>=8?t!==""&&t!=="-"&&(t=parseFloat(t).toExponential(2)):t+=i:t.includes(".")||(t+=t===""||t==="-"?"0.":"."),s.innerHTML=t}}o.forEach(i=>{i.onclick=function(){c(i.innerHTML)}}),n.querySelector("#btn_op_mult").onclick=()=>{t!==""&&(a="x")},n.querySelector("#btn_op_plus").onclick=()=>{t!==""&&(a="+")},n.querySelector("#btn_op_minus").onclick=()=>{t!==""&&(a="-")},n.querySelector("#btn_op_div").onclick=()=>{t!==""&&(a="/")},n.querySelector("#btn_op_clear").onclick=()=>{t="",e="",a=null,s.innerHTML=0},n.querySelector("#btn_op_sign").onclick=()=>{a?e!=""&&(e=(parseFloat(e)*-1).toString(),s.innerHTML=e):t!=""&&(t=(parseFloat(t)*-1).toString(),s.innerHTML=t)},n.querySelector("#btn_op_equal").onclick=()=>{if(t===""||e===""||!a)return;let i=0;switch(a){case"x":i=+t*+e;break;case"+":i=+t+ +e;break;case"-":i=+t-+e;break;case"/":i=+t/+e;break}let r=i.toString();r.length>8&&(r=i.toPrecision(7).toString(),r.includes(".")&&(r=parseFloat(r).toString()),r.length>8&&(r=r.substring(0,8))),t=r,e="",a=null,s.innerHTML=t}},0),n},k=()=>{const n=document.createElement("div");return n.className="author-info",n.innerHTML=`
        <details class="author-text">
            <summary>Об авторе</summary>
            <p class="author-name">Али Алан ИУ5-46Б</p>
        </details>
    `,n},b=()=>{const n=document.getElementById("app"),t=document.getElementById("header-slot"),e=document.getElementById("footer-slot"),a=window.location.hash||"#main",s=a.split("?")[0],c=new URLSearchParams(a.split("?")[1]||"").get("id");t.innerHTML="",t.appendChild(p(s)),n.innerHTML="",s==="#main"?v(n):s==="#product"?g(n,c):s==="#product-edit"?w(n,c):s==="#sms"?n.appendChild(_()):s==="#calc"?n.appendChild(S()):s==="#author"&&n.appendChild(k()),e.innerHTML="",e.appendChild(m())};window.addEventListener("hashchange",b);window.addEventListener("load",b);
