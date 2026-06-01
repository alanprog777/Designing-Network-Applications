class Ajax {
    // Вспомогательный метод для отправки XHR-запросов
    _sendRequest(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let parsedData = true; // Запасной вариант для 204 No Content
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
            console.error('Ошибка сети (проверьте работу сервера и CORS)');
            if (callback) callback(null);
        };

        // Отправляем данные, если они есть
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
