/*Algorithm:
Reverse the whole array
Reverse the first k elements
Reverse the remaining n - k elements*/

function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n; // handle k > n

  reverse(arr, 0, n - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, n - 1);

  return arr;
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Example
console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));

/*Algorithm:
Reverse first k elements
Reverse remaining n - k elements
Reverse the entire array*/

function rotateLeft(arr, k) {
  const n = arr.length;
  k = k % n; // handle k > n

  reverse(arr, 0, k - 1);
  reverse(arr, k, n - 1);
  reverse(arr, 0, n - 1);

  return arr;
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Example
console.log(rotateLeft([1, 2, 3, 4, 5, 6, 7], 3));
