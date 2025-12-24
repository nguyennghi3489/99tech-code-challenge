# Problem 1 Solutions

## Answer 1: Sum of Array Elements

```javascript
function sum_to_n_b(n) {
  if (n === 0) return 0;
  return n + sum_to_n_b(n - 1);
}
```

Time complexity: O(N)
Space complexity: O(N)

## Answer 2: Loop Approach

```javascript
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

## Answer 3: Mathematical Formula

// Using the math formula
// 1 ... 6 = (1 + 6) + (2 + 5) + (3 + 4)
= (1 + 6) _ 3
= (1 + n) _ (n/2)

```javascript
function sum_to_n_c(n) {
  return (n * (n + 1)) / 2;
}
```

Time complexity: O(1)
Space complexity: O(1)
