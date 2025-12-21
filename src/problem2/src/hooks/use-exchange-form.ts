import { useForm } from "react-hook-form";
import { useGetTokenList } from "./use-get-token-list";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import debounce from "lodash/debounce";
import { swapToken } from "@/services/exchanges";
import { convertAmountToNumber } from "@/utils/convert";

interface ExchangeFormData {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

export const useExchangeForm = () => {
  const { data: currencies } = useGetTokenList();
  const lastEditedField = useRef<"from" | "to" | null>("from");
  const previousFromAmount = useRef<string>("1");
  const previousToAmount = useRef<string>("");
  const [exchangingFromAmount, setExchangingFromAmount] = useState(false);
  const [exchangingToAmount, setExchangingToAmount] = useState(false);

  const { control, watch, setValue, reset } = useForm<ExchangeFormData>({
    defaultValues: {
      fromToken: "",
      toToken: "",
      fromAmount: "1",
      toAmount: "",
    },
  });

  useEffect(() => {
    if (currencies && !fromToken && !toToken) {
      updateAmount(
        "toAmount",
        currencies[0].currency,
        currencies[1].currency,
        "1",
        setExchangingToAmount
      );
      reset({
        fromToken: currencies[0].currency,
        toToken: currencies[1].currency,
      });
    }
  }, [currencies, reset]);

  const fromToken = watch("fromToken");
  const toToken = watch("toToken");
  const fromAmount = watch("fromAmount");
  const toAmount = watch("toAmount");

  const swapCurrency = () => {
    const tempToken = fromToken;
    if (lastEditedField.current === "from") {
      debounceUpdateAmount(
        "toAmount",
        toToken,
        fromToken,
        fromAmount,
        setExchangingToAmount
      );
    } else {
      debounceUpdateAmount(
        "fromAmount",
        fromToken,
        toToken,
        toAmount,
        setExchangingFromAmount
      );
    }
    setValue("fromToken", toToken);
    setValue("toToken", tempToken);
  };

  const updateAmount = async (
    field: keyof ExchangeFormData,
    fromToken: string,
    toToken: string,
    amount: string,
    setExchangingAmount: Dispatch<SetStateAction<boolean>>
  ) => {
    setExchangingAmount(true);
    const exchangeAmount = await swapToken({
      fromToken,
      toToken,
      amount: convertAmountToNumber(amount),
    });
    setExchangingAmount(false);
    setValue(field, exchangeAmount.toFixed(8));
    if (field === "fromAmount") {
      previousFromAmount.current = exchangeAmount.toFixed(8);
    } else {
      previousToAmount.current = exchangeAmount.toFixed(8);
    }
  };

  const debounceUpdateAmount = useRef(
    debounce(
      (
        field: keyof ExchangeFormData,
        fromToken: string,
        toToken: string,
        amount: string,
        setExchangingAmount: Dispatch<SetStateAction<boolean>>
      ) => {
        updateAmount(field, fromToken, toToken, amount, setExchangingAmount);
      },
      1000
    )
  ).current;

  const updateFromAmountToken = (value: string) => {
    lastEditedField.current = "from";
    if (
      convertAmountToNumber(previousFromAmount.current) ===
      convertAmountToNumber(value)
    )
      return;
    previousFromAmount.current = value;
    debounceUpdateAmount(
      "toAmount",
      fromToken,
      toToken,
      value,
      setExchangingToAmount
    );
  };

  const updateToAmountToken = (value: string) => {
    lastEditedField.current = "to";
    if (
      convertAmountToNumber(previousToAmount.current) ===
      convertAmountToNumber(value)
    )
      return;
    previousToAmount.current = value;
    debounceUpdateAmount(
      "fromAmount",
      toToken,
      fromToken,
      value,
      setExchangingFromAmount
    );
  };

  const updateFromToken = (value: string) => {
    if (lastEditedField.current === "from") {
      debounceUpdateAmount(
        "toAmount",
        value,
        toToken,
        fromAmount,
        setExchangingToAmount
      );
    } else {
      debounceUpdateAmount(
        "fromAmount",
        toToken,
        value,
        toAmount,
        setExchangingFromAmount
      );
    }
  };

  const updateToToken = (value: string) => {
    if (lastEditedField.current === "from") {
      debounceUpdateAmount(
        "toAmount",
        fromToken,
        value,
        fromAmount,
        setExchangingToAmount
      );
    } else {
      debounceUpdateAmount(
        "fromAmount",
        value,
        fromToken,
        toAmount,
        setExchangingFromAmount
      );
    }
  };

  const getUSDValue = (currency: string) => {
    const priceOrNull = currencies?.find(
      (item) => item.currency === currency
    )?.price;
    return priceOrNull ? `${priceOrNull.toFixed(2)} USD` : "N/A";
  };

  const uniqueTokens = Array.from(
    new Map(currencies?.map((token) => [token.currency, token])).values()
  );

  return {
    control,
    getUSDValue,
    uniqueTokens,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    swapCurrency,
    lastEditedField,
    exchangingFromAmount,
    exchangingToAmount,
    updateFromAmountToken,
    updateToAmountToken,
    updateFromToken,
    updateToToken,
  };
};
