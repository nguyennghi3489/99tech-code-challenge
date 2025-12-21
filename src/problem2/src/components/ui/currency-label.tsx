import { CurrencyLogo } from "./currency-logo";

interface Props {
  currency: string;
}
export const CurrencyLabel = ({ currency }: Props) => {
  return (
    <div className="flex gap-4">
      <CurrencyLogo currency={currency} />
      <p className="text-2xl font-bold capitalize">{currency}</p>
    </div>
  );
};
