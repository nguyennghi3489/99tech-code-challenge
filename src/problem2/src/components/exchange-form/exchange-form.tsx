import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CurrencyLabel } from "../ui/currency-label";
import { CurrencyInput } from "../ui/currency-input";
import { transform } from "@/utils/form";
import { useExchangeForm } from "@/hooks/use-exchange-form";

export const ExchangeForm = () => {
  const {
    fromToken,
    toToken,
    control,
    uniqueTokens,
    getUSDValue,
    swapCurrency,
    exchangingFromAmount,
    exchangingToAmount,
    updateFromAmountToken,
    updateToAmountToken,
    updateToToken,
    updateFromToken,
  } = useExchangeForm();
  return (
    <form className="flex flex-col justify-center w-120 box-content gap-10 bg-gray-50 rounded-2xl p-8 shadow">
      <div className="flex flex-col gap-4">
        <div className="flex align-middle items-center gap-4 justify-between">
          <CurrencyLabel currency={fromToken} />
          <Controller
            name="fromToken"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  updateFromToken(e);
                  field.onChange(e);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTokens.map((token) => (
                    <SelectItem
                      key={`from-${token.currency}`}
                      value={token.currency}
                    >
                      {token.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Controller
            name="fromAmount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                onInputChange={(e: string) => {
                  updateFromAmountToken(e);
                  field.onChange(e);
                }}
                transform={transform}
                value={field.value}
                suffix={getUSDValue(fromToken)}
                loading={exchangingFromAmount}
              />
            )}
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={swapCurrency}
        disabled={exchangingFromAmount || exchangingToAmount}
      >
        ⇅ Swap
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex align-middle items-center gap-4 justify-between">
          <CurrencyLabel currency={toToken} />
          <Controller
            name="toToken"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(e) => {
                  updateToToken(e);
                  field.onChange(e);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTokens.map((token) => (
                    <SelectItem
                      key={`to-${token.currency}`}
                      value={token.currency}
                    >
                      {token.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Controller
            name="toAmount"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                onInputChange={(e: string) => {
                  updateToAmountToken(e);
                  field.onChange(e);
                }}
                transform={transform}
                value={field.value}
                suffix={getUSDValue(toToken)}
                loading={exchangingToAmount}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};
