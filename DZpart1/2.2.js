const readline = require('readline');

function summarizeRanges(nums) {
  if (nums.length === 0) return '';

  const sortedNums = [...nums].sort((a, b) => a - b);

  const ranges = [];
  let start = sortedNums[0];

  for (let i = 0; i < sortedNums.length; i++) {
    if (sortedNums[i] + 1 !== sortedNums[i + 1]) {
      if (start === sortedNums[i]) {
        ranges.push(`${start}`);
      } else {
        ranges.push(`${start}-${sortedNums[i]}`);
      }
      start = sortedNums[i + 1];
    }
  }

  return ranges.join(',');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите числа через пробел: ', (answer) => {

  const inputNums = answer
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter(n => !isNaN(n));

  if (inputNums.length === 0) {
    console.log("Вы не ввели ни одного корректного числа.");
  } else {
    const result = summarizeRanges(inputNums);
    console.log("Результат:", result);
  }

  rl.close();
});
