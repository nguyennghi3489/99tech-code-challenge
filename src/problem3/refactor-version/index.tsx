interface Props extends BoxProps {
  children: ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

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

  return <div {...rest}>{balanceRows}</div>;
};
