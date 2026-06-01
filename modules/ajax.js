class Ajax {
    _sendRequest(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let parsedData = null;
                if (xhr.responseText) {
                    try {
                        parsedData = JSON.parse(xhr.responseText);
                    } catch (e) {
                        console.error('Ошибка парсинга JSON:', e);
                    }
                }
                if (callback) callback(parsedData);
            } else {
                console.error(`Ошибка HTTP: ${xhr.status}`);
                if (callback) callback(null);
            }
        };

        xhr.onerror = () => {
            console.error('Ошибка сети / Блокировка CORS');
            if (callback) callback(null); // Вызываем колбэк даже при ошибке CORS
        };

        xhr.send(data ? JSON.stringify(data) : null);
    }

    get(url, callback) {
        this._sendRequest('GET', url, null, callback);
    }

    post(url, data, callback) {
        this._sendRequest('POST', url, data, callback);
    }

    patch(url, data, callback) {
        this._sendRequest('PATCH', url, data, callback);
    }

    delete(url, callback) {
        this._sendRequest('DELETE', url, null, callback);
    }
}

export const ajax = new Ajax();
