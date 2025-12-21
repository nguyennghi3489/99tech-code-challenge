export const convertAmountToNumber = (value: string) => {
  return Number(value.replaceAll(",", ""));
};
