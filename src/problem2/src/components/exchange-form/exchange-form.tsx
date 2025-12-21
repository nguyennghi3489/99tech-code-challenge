import { useForm, Controller } from "react-hook-form";
import { useGetTokenList } from "../../hooks/use-get-token-list";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CurrencyLabel } from "../ui/currency-label";
import { useEffect } from "react";
import { CurrencyInput } from "../ui/currency-input";
import { transform } from "@/utils/form";

interface ExchangeFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

export const ExchangeForm = () => {
  const { data: currencies } = useGetTokenList();
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<ExchangeFormData>({
      defaultValues: {
        fromToken: "",
        toToken: "",
        fromAmount: "",
        toAmount: "",
      },
    });

  useEffect(() => {
    if (currencies && !fromToken && !toToken) {
      reset({
        fromToken: currencies[0].currency,
        toToken: currencies[1].currency,
      });
    }
  }, [currencies]);

  const fromToken = watch("fromToken");
  const toToken = watch("toToken");
  const fromAmount = watch("fromAmount");
  const toAmount = watch("toAmount");

  const handleSwap = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setValue("fromToken", toToken);
    setValue("toToken", tempToken);
    setValue("fromAmount", toAmount);
    setValue("toAmount", tempAmount);
  };

  const getUSDValue = (currency: string) => {
    const priceOrNull = currencies?.find(
      (item) => item.currency === currency
    )?.price;
    return priceOrNull ? `${priceOrNull.toFixed(2)} usd` : "N/A";
  };

  const onSubmit = (data: ExchangeFormData) => {
    console.log("Exchange data:", data);
  };

  const uniqueTokens = Array.from(
    new Map(currencies?.map((token) => [token.currency, token])).values()
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center w-[400px] box-content gap-10 bg-gray-50 rounded-2xl p-8 shadow"
    >
      <div className="flex flex-col gap-4">
        <div className="flex align-middle items-center gap-4 justify-between">
          <CurrencyLabel currency={fromToken} />
          <Controller
            name="fromToken"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
                onInputChange={field.onChange}
                transform={transform}
                value={field.value}
                suffix={getUSDValue(fromToken)}
              />
            )}
          />
        </div>
      </div>

      <Button type="button" onClick={handleSwap}>
        ⇅ Swap
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex align-middle items-center gap-4 justify-between">
          <CurrencyLabel currency={toToken} />
          <Controller
            name="toToken"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
                onInputChange={field.onChange}
                transform={transform}
                value={field.value}
                suffix={getUSDValue(toToken)}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};
