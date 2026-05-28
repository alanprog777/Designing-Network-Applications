class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка GET:', error);
            return null;
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка POST:', error);
            return null;
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка PATCH:', error);
            return null;
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Ошибка DELETE:', error);
            return null;
        }
    }
}

export const ajax = new Ajax();
