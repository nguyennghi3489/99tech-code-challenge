# Problem 3: Code Refactoring

### 1. Type Safety Issues

#### Issue

- Missing `blockchain` property in `WalletBalance` interface
- `getPriority` function parameter typed as `any`

##### Solution

```typescript
// Added blockchain property
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // ✅ Added
}

// Create FormattedWalletBalance by Extending WalletBalance
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Changed from any to string
const getPriority = (blockchain: string): number => {
  // ✅ Proper typing
  // ...
};
```

### 2. Code structures

##### Solution

```typescript
// ✅ Create utils file includes functions:
export const getPriority = (blockchain: string): number = {...}
export const filterByPriorityAndAmount = (balance: WalletBalance): boolean => {...}
export const sortByPriority = (lhs: WalletBalance, rhs: WalletBalance) => {...}
export const formatBalances
```

```typescript
// ✅ Create models file includes interfaces:
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

### 3. Bugs

#### Issue unused variable

```typescript
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
```

##### Solution

```typescript
// ✅ Correct
const lhsPriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
```

#### Issue filter logic

```typescript
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;
```

##### Solution

I think it could be wrong logic. The balance amount should greater than zero also

```typescript
// ✅ Correct
return balancePriority > -99 && balance.amount > 0;
```

#### Issue Sort logic

The sort function didn't return a value when priorities were equal.

```typescript
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
```

##### Solution

```typescript
// ✅ Correct
return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
```

#### Issue unnecessary Dependencies in useMemo

`prices` was included in the dependency array of `sortedBalances` but never used in the computation, causing unnecessary re-calculations.

```typescript
const sortedBalances = useMemo(() => {
  ....
}, [balances, prices]);
```

##### Solution

```typescript
// ✅ Correct
const sortedBalances = useMemo(() => {
  ....
}, [balances]);
```

### Performance

#### Issue use index for array element key

Using array index as React key causes issues when list order changes.

```typescript
<WalletRow key={index} ... />
```

#### Solution

```typescript
// ✅ Correct
<WalletRow key={balance.currency} ... />
```

### Enhance the rows rendering

#### Issue

- `formattedBalances` was created but never used. It should be replace `sortedBalances` in this row
  And it can be combine in one place with filter and sort function.

#### Solution

```typescript
// ✅ Correct
const balanceRows = useMemo(() => {
  return balances
    .filter(filterByPriorityAndAmount)
    .sort(sortByPriority)
    .map(formatBalances)
    .map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
}, [balances, prices]);
```
