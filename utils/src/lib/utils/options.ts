export type Option = {
  label: string;
  value: string | undefined;
  available?: boolean;
};

export const toOption = <T extends string>(option: T) =>
  ({
    label: option.charAt(0).toUpperCase() + option.slice(1),
    value: option,
    available: true,
  } as Option);

export const toRepr = (option: string) => {
  return {
    value: option,
    label: option.charAt(0).toUpperCase() + option.slice(1),
    available: true,
  };
};
