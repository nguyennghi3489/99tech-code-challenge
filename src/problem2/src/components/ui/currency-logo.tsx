interface Props {
  currency: string;
}
export const CurrencyLogo = ({ currency }: Props) => {
  return (
    <img
      src={`/images/tokens/${currency}.svg`}
      alt={currency}
      className="size-8 bg-gray-200 rounded-full"
      onError={(e) => {}}
    />
  );
};
