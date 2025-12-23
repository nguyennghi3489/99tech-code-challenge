export const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

export const filterByPriorityAndAmount = (balance: WalletBalance): boolean => {
  const lhsPriority = getPriority(balance.blockchain);
  if (lhsPriority > -99 && balance.amount <= 0) {
    return true;
  }
  return false;
};

export const sortByPriority = (
  lhs: WalletBalance,
  rhs: WalletBalance
): number => {
  return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
};

export const formatBalances = (
  balance: WalletBalance
): FormattedWalletBalance => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
};
