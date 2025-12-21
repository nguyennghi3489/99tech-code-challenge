# Problem 1 Solutions

## Answer 1: Sum of Array Elements

```javascript
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

Time complexity: O(N)
Space complexity: O(1)

## Answer 2: While Loop Approach

```javascript
function sum_to_n_c(n) {
  let sum = 0;
  let i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
}
```

Time complexity: O(N)
Space complexity: O(1)

## Answer 3: Mathematical Formula

// Using the math formula
// 1 ... 6 = (1 + 6) + (2 + 5) + (3 + 4)
= (1 + 6) _ 3
= (1 + n) _ (n/2)

```javascript
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}
```

Time complexity: O(1)
Space complexity: O(1)
