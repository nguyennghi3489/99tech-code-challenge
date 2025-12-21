import { tokens } from "../data/token-price";
import type { Token, SwapRequestData } from "../models";

export const getTokenList = () => {
  return Promise.resolve(
    Object.values(
      tokens.reduce((acc: Record<string, Token>, cur: Token) => {
        acc[cur.currency] = cur;

        return acc;
      }, {})
    )
  );
};

export const swapToken = async ({
  fromToken,
  toToken,
  amount,
}: SwapRequestData): Promise<number> => {
  const tokenList = await getTokenList();
  const fromTokenValue = tokenList.find(
    (item) => item.currency === fromToken
  )?.price;
  const toTokenValue = tokenList.find(
    (item) => item.currency === toToken
  )?.price;

  if (!fromTokenValue || !toTokenValue)
    return Promise.reject(new Error("Unable to process swap token"));

  const ratio = fromTokenValue / toTokenValue;

  return new Promise((resolve) =>
    setTimeout(() => resolve(ratio * amount), 1000)
  );
};
