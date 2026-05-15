const readline = require('readline');

function rle(str) {
    if (str.length === 0) return '';

    let result = [];
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result.push(count + str[i]);
            count = 1;
        }
    }

    return result.join('/');
}

function rleDecode(str) {
    let result = '';
    const parts = str.split('/');

    for (let part of parts) {
        if (part === '') continue;

        let countStr = '';
        let char = '';

        for (let i = 0; i < part.length; i++) {
            if (part[i] >= '0' && part[i] <= '9') {
                countStr += part[i];
            } else {
                char = part[i];
                break;
            }
        }

        if (countStr && char) {
            result += char.repeat(parseInt(countStr));
        }
    }

    return result;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите строку для сжатия: ', (input) => {
    const compressed = rle(input);
    console.log(`Сжатая: "${compressed}"`);

    rl.question('\nВведите строку для распаковки', (encoded) => {
        const decompressed = rleDecode(encoded);
        console.log(`Распакованная: "${decompressed}"`);
        rl.close();
    });
});
