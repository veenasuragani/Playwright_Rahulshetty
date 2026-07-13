function findMissingNumber(arr) {
  const n = arr.length + 1; // because one number is missing
  const expectedSum = (n * (n + 1)) / 2;

  const actualSum = arr.reduce((acc, num) => acc + num, 0);

  return expectedSum - actualSum;
}

console.log(findMissingNumber([1, 2, 4, 5])); // Output: 3
console.log(findMissingNumber([1, 3, 4, 5]));  // Output: 2