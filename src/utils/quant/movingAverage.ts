import DayCandle from "upbit-api/container/candles/DayCandle";

export const calcIncreaseRatioOfMA = (
  candles: Array<DayCandle>,
  interval: number
) => {
  if (candles.length < interval) {
    throw new Error("the inverval is bigger than the passed data ");
  }
  const MAArray = returnMAArray(candles, interval);
  return (MAArray[MAArray.length - 1] - MAArray[0]) / MAArray[0];
};

export const returnMAArray = (candles: Array<DayCandle>, interval: number) => {
  const dateAscendingCandle =
    new Date(candles[0].candleDateTimeUTC).getTime() -
      new Date(candles[0].candleDateTimeUTC).getTime() >
    0
      ? [...candles].reverse()
      : candles;

  const maArray: Array<number> = [];
  const totalCount = dateAscendingCandle.length;
  const prevClosingPrices = dateAscendingCandle.map(
    (el) => el.prevClosingPrice
  );
  for (let i = 0; i < totalCount - (interval - 1); i++) {
    const temp_array = prevClosingPrices.slice(i, i + (interval - 1));
    const average = temp_array.reduce((a, b) => a + b, 0);
    maArray.push(average);
  }
  return maArray;
};
