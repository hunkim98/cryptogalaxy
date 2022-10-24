export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

export const changeRelativeValueToRealValue = (
  value: number,
  inputMin: number,
  inputMax: number,
  returnMin: number,
  returnMax: number
) => {
  let relativeValue = value;
  if (relativeValue > inputMax) {
    relativeValue = inputMax;
  }
  if (relativeValue < inputMin) {
    relativeValue = inputMin;
  }
  // this relativeInputValue will be a value between 0 and 1 always
  const relativeInputValue = (relativeValue - inputMin) / (inputMax - inputMin);

  return relativeInputValue * (returnMax - returnMin) + returnMin;
};
