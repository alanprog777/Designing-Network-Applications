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


const input = [1, 2, 3, 5, 6, 7, 10, 11, 12, 14, 16, 17, 18];
console.log(summarizeRanges(input));
