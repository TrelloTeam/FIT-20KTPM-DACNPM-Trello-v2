const isValidFieldBeforeParse = ({ data, value }: { data: Record<string, string | number>; value: string | number }): boolean => {
  return Object.keys(data)
    .filter((elm) => isNaN(Number(elm)))
    .includes(value.toString());
};

export default {
  isValidFieldBeforeParse,
};
