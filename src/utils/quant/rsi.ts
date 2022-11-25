import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

/**
 * https://www.macroption.com/rsi-calculation/
 * calculates Relative Strength Index
 * @param candles
 */
export const calcRSI = (candles: Array<ICandleDayReturnProps>) => {
  const RSI_PERIOD = 15; // the most common calculation for RSI is 14 days
  if (RSI_PERIOD + 1 > candles.length) {
    throw Error("Not enough data to calculate RSI");
  }
  const dateAscendingCandles =
    new Date(candles[0].candle_date_time_utc).getTime() -
      new Date(candles[candles.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candles].reverse()
      : candles;
  const consideredCandles = dateAscendingCandles.slice(-RSI_PERIOD - 1);

  const candleUpChanges: Array<number> = [];
  const candleDownChanges: Array<number> = [];
  consideredCandles.forEach((candle, index) => {
    if (index !== consideredCandles.length - 1) {
      const amount =
        consideredCandles[index + 1].prev_closing_price -
        candle.prev_closing_price;
      if (amount > 0) {
        candleUpChanges.push(Math.abs(amount));
      } else {
        candleDownChanges.push(Math.abs(amount));
      }
    }
  });

  const avgUpChange = candleUpChanges.reduce((a, b) => a + b, 0) / RSI_PERIOD;
  const avgDownChange =
    candleDownChanges.reduce((a, b) => a + b, 0) / RSI_PERIOD;
  const relativeStrength = avgUpChange / avgDownChange;
  const relativeStrengthIndex = 100 - 100 / (1 + relativeStrength);
  return relativeStrengthIndex;
};
