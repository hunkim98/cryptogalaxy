import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

export const calcSupportResistance = (
  candles: Array<ICandleDayReturnProps>
) => {
  const dateAscendingCandle =
    new Date(candles[0].candle_date_time_utc).getTime() -
      new Date(candles[candles.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candles].reverse()
      : candles;
  const prevClosingPrices = dateAscendingCandle.map(
    (el) => el.prev_closing_price
  );
  const max = Math.max(...prevClosingPrices);
  const min = Math.min(...prevClosingPrices);
  const range = max - min;
  const support = min + range * 0.382;
  const resistance = max - range * 0.382;
  return { support, resistance };
};
