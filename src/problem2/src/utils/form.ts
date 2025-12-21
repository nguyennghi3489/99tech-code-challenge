import { ONLY_NUMBER_REGEX, THOUSAND_SEPARATION_REGEX } from "@/constants";

export interface TransformFunctions {
  type: (e: React.ChangeEvent<HTMLInputElement>) => string;
  output: (e: React.ChangeEvent<HTMLInputElement>) => string;
  input: (e: React.ChangeEvent<HTMLInputElement>) => string;
}

export const transform: TransformFunctions = {
  type: (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || ONLY_NUMBER_REGEX.test(value)) {
      return value;
    }
    return e.target.value.slice(0, -1);
  },
  output: (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const [integer, decimal] = value.split(".");
    const formattedInteger = integer.replace(THOUSAND_SEPARATION_REGEX, ",");

    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  },
  input: (e: React.ChangeEvent<HTMLInputElement>) => {
    return e.target.value.replaceAll(",", "");
  },
};
