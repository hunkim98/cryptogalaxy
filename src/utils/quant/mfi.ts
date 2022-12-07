import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

export const calcMFI = (candles: Array<ICandleDayReturnProps>) => {
  const MFI_PERIOD = 5; // the most common calculation for MFI is 14 days
  if (MFI_PERIOD + 1 > candles.length) {
    throw Error("Not enough data to calculate MFI");
  }
  const dateAscendingCandles =
    new Date(candles[0].candle_date_time_utc).getTime() -
      new Date(candles[candles.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candles].reverse()
      : candles;

  const consideredCandles = dateAscendingCandles.slice(-MFI_PERIOD - 1);
  const mfiUpChanges: Array<number> = [];
  const mfiDownChanges: Array<number> = [];
  //  MF(Money Flow) = 평균가 * 거래량
  // 평균가 = (고가 + 저가 + 종가) / 3
  consideredCandles.forEach((candle, index) => {
    if (index !== consideredCandles.length - 1) {
      const dayHigh = candle.high_price;
      const dayLow = candle.low_price;
      const dayClose = candle.trade_price;
      const averagePrice = (dayHigh + dayLow + dayClose) / 3;
      const moneyFlow = averagePrice * candle.candle_acc_trade_volume;
      const isTodayPriceHigher = dayClose > candle.prev_closing_price;
      if (isTodayPriceHigher) {
        mfiUpChanges.push(Math.abs(moneyFlow));
      } else {
        mfiDownChanges.push(Math.abs(moneyFlow));
      }
    }
  });
  // MFI는 0에서 100 사이의 값을 가집니다. 100에 가까울수록 과매수 상태이며,
  // 0에 가까울 수록 과매도 상태입니다.
  const moneyFlowRatio =
    mfiUpChanges.reduce((a, b) => a + b, 0) /
    mfiDownChanges.reduce((a, b) => a + b, 0);

  //MFI = 100 - (100 / (1 + MFR))
  const moneyFlowIndex = 100 - 100 / (1 + moneyFlowRatio);
  return moneyFlowIndex;
};
