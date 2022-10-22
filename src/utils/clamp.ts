export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

export const changeRelativeValueToRealValue = (
  value: number,
  min: number,
  max: number
) => {
  if (value < -1 || value > 1) {
    throw new Error("Value must be between -1 and 1");
  }
  return ((value + 1) * (max - min)) / 2 + min;
};
