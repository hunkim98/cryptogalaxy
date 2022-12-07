import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

enum CandleTrend {
  RED = "RED", //red means upward
  BLUE = "BLUE", //blue means downward
}

export const calcSupportResistance = (
  candles: Array<ICandleDayReturnProps>
): { support: Array<number>; resistance: Array<number> } => {
  const resistance: Array<number> = [];
  const support: Array<number> = [];
  const dateAscendingCandle =
    new Date(candles[0].candle_date_time_utc).getTime() -
      new Date(candles[candles.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candles].reverse()
      : candles;
  // dateAscendingCandle.pop(); // we do not need today's candle (the last one)
  const trade_volume = dateAscendingCandle.map(
    (el) => el.candle_acc_trade_volume
  );

  const priceRange = 4;

  const volumeAverageInterval = 10;

  outerLoop: for (let i = 0; i < dateAscendingCandle.length; i++) {
    if (
      i - volumeAverageInterval < 0 ||
      i + volumeAverageInterval > dateAscendingCandle.length
    ) {
      continue;
    }
    const candle = dateAscendingCandle[i];
    const currentDayHighPrice = candle.high_price;
    const currentDayLowPrice = candle.low_price;
    const trade_volume_average =
      dateAscendingCandle
        .slice(i - volumeAverageInterval, i)
        .map((el) => el.candle_acc_trade_volume)
        .reduce((a, b) => a + b, 0) / volumeAverageInterval;
    if (support.length !== 0) {
      if (currentDayLowPrice < support[support.length - 1]) {
        // if the price goes lower than the support, the support will be the new resistance
        const prevSupport = support.pop()!;
        resistance.push(prevSupport);
      }
    }
    if (resistance.length !== 0) {
      if (currentDayHighPrice > resistance[resistance.length - 1]) {
        // if the price goes higher than the resistance, the resistance will be the new support
        const prevResistance = resistance.pop()!;
        support.push(prevResistance);
      }
    }

    if (trade_volume[i] < trade_volume_average) {
      // pass the candle that has low trade volume
      continue;
    }

    if (
      i - Math.floor(priceRange / 2) < 0 ||
      i + Math.floor(priceRange / 2) > dateAscendingCandle.length
    ) {
      continue;
    }

    const leftCandles: Array<ICandleDayReturnProps> = [];
    const rightCandles: Array<ICandleDayReturnProps> = [];
    for (let a = 1; a <= Math.floor(priceRange / 2); a++) {
      leftCandles.unshift(dateAscendingCandle[i - a]);
      rightCandles.push(dateAscendingCandle[i + a]);
    }
    let leftTrend: CandleTrend | null = null;
    let rightTrend: CandleTrend | null = null;
    const leftCandlesHighLowPrices = { high: 0, low: Number.MAX_VALUE };
    const rightCandlesHighLowPrices = { high: 0, low: Number.MAX_VALUE };
    for (const leftCandle of leftCandles) {
      if (!leftCandle) {
        continue outerLoop;
      }
      const candleOpenPriceSubtractedByClosingPrice =
        leftCandle.opening_price - leftCandle.trade_price;
      let finalTrend: CandleTrend;
      finalTrend =
        candleOpenPriceSubtractedByClosingPrice > 0
          ? CandleTrend.BLUE
          : CandleTrend.RED;

      if (leftTrend !== null && leftTrend !== finalTrend) {
        continue outerLoop;
      }

      leftTrend = finalTrend;

      if (leftCandlesHighLowPrices.high < leftCandle.high_price) {
        leftCandlesHighLowPrices.high = leftCandle.high_price;
      }
      if (leftCandlesHighLowPrices.low > leftCandle.low_price) {
        leftCandlesHighLowPrices.low = leftCandle.low_price;
      }
    }

    for (const rightCandle of rightCandles) {
      if (!rightCandle) {
        continue outerLoop;
      }
      const candleOpenPriceSubtractedByClosingPrice =
        rightCandle.opening_price - rightCandle.trade_price;
      let finalTrend: CandleTrend;
      finalTrend =
        candleOpenPriceSubtractedByClosingPrice > 0
          ? CandleTrend.BLUE
          : CandleTrend.RED;
      if (rightTrend !== null && rightTrend !== finalTrend) {
        continue outerLoop;
      }

      rightTrend = finalTrend;

      if (rightCandlesHighLowPrices.high < rightCandle.high_price) {
        rightCandlesHighLowPrices.high = rightCandle.high_price;
      }
      if (rightCandlesHighLowPrices.low > rightCandle.low_price) {
        rightCandlesHighLowPrices.low = rightCandle.low_price;
      }
    }
    if (rightTrend === leftTrend) {
      continue;
    }
    if (leftTrend === CandleTrend.RED && rightTrend === CandleTrend.BLUE) {
      // there is a possibility that the price is a resistance
      if (
        currentDayHighPrice < leftCandlesHighLowPrices.high ||
        currentDayHighPrice < rightCandlesHighLowPrices.high
      ) {
        continue;
      }
      resistance.push(currentDayHighPrice);
    } else {
      // there is a possibility that the price is a support
      if (
        currentDayLowPrice > leftCandlesHighLowPrices.low ||
        currentDayLowPrice > rightCandlesHighLowPrices.low
      ) {
        continue;
      }
      support.push(currentDayLowPrice);
    }
  }
  return { support, resistance };
};
