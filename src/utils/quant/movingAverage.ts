import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

export const calcIncreaseRatioOfMA = (
  candles: Array<ICandleDayReturnProps>,
  interval: number
) => {
  if (candles.length < interval) {
    throw new Error("the inverval is bigger than the passed data ");
  }
  const MAArray = returnMAArray(candles, interval);
  return (MAArray[MAArray.length - 1] - MAArray[0]) / MAArray[0];
};

export const returnMAArray = (
  candles: Array<ICandleDayReturnProps>,
  interval: number
) => {
  const dateAscendingCandle =
    new Date(candles[0].candle_date_time_utc).getTime() -
      new Date(candles[candles.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candles].reverse()
      : candles;

  const maArray: Array<number> = [];
  const totalCount = dateAscendingCandle.length;
  const prevClosingPrices = dateAscendingCandle.map(
    (el) => el.prev_closing_price
  );
  for (let i = 0; i < totalCount - (interval - 1); i++) {
    const temp_array = prevClosingPrices.slice(i, i + (interval - 1));
    const average = temp_array.reduce((a, b) => a + b, 0) / temp_array.length;
    maArray.push(average);
  }
  return maArray;
};
