const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function merge(...objects) {
  return objects.reduce((acc, current) => {
    Object.keys(current).forEach(key => {
      if (!(key in acc)) acc[key] = current[key];
    });
    return acc;
  }, {});
}

rl.question('Введите объекты через запятую (например: {"a":1}, {"b":2}): ', (answer) => {
  try {
    const objects = JSON.parse(`[${answer}]`);
    console.log('Результат:', merge(...objects));
  } catch (e) {
    console.log('Ошибка! Вводи в формате JSON: {"a":1}, {"b":2}');
  }
  rl.close();
});
