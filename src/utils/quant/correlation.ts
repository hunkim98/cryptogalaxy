import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

/**
 * Pearson correlation coefficient (PCC)
 * @param candlesA
 * @param candlesB
 * @returns coefficient between -1 and 1
 */
export const calcCorrelationCoefficient = (
  candlesA: Array<ICandleDayReturnProps>,
  candlesB: Array<ICandleDayReturnProps>
) => {
  const dateAscendingCandlesA =
    new Date(candlesA[0].candle_date_time_utc).getTime() -
      new Date(candlesA[candlesA.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candlesA].reverse()
      : candlesA;

  const dateAscendingCandlesB =
    new Date(candlesB[0].candle_date_time_utc).getTime() -
      new Date(candlesB[candlesB.length - 1].candle_date_time_utc).getTime() >
    0
      ? [...candlesA].reverse()
      : candlesA;

  const prevClosingPricesA = dateAscendingCandlesA.map(
    (el) => el.prev_closing_price
  );

  const prevClosingPricesB = dateAscendingCandlesB.map(
    (el) => el.prev_closing_price
  );

  const prevClosingPricesMeanA =
    prevClosingPricesA.reduce((a, b) => a + b, 0) / prevClosingPricesA.length;

  const prevClosingPricesMeanB =
    prevClosingPricesB.reduce((a, b) => a + b, 0) / prevClosingPricesB.length;

  const prevClosingPricesMeanDiffSquaredSumA = prevClosingPricesA
    .map((price) => Math.pow(price - prevClosingPricesMeanA, 2))
    .reduce((a, b) => a + b, 0);

  const prevClosingPricesMeanDiffSquaredSumB = prevClosingPricesB
    .map((price) => Math.pow(price - prevClosingPricesMeanB, 2))
    .reduce((a, b) => a + b, 0);

  let covariance = 0;

  for (let i = 0; i < candlesA.length; i++) {
    covariance +=
      (candlesA[i].prev_closing_price - prevClosingPricesMeanA) *
      (candlesB[i].prev_closing_price - prevClosingPricesMeanB);
  }

  return (
    covariance /
    (Math.sqrt(prevClosingPricesMeanDiffSquaredSumA) *
      Math.sqrt(prevClosingPricesMeanDiffSquaredSumB))
  );
};
