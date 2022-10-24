import { getDayCandles, getTicker } from "api/upbit";
import { createContext, useCallback, useEffect, useState } from "react";
import { calcCorrelationCoefficient } from "utils/quant/correlation";
import { calcIncreaseRatioOfMA } from "utils/quant/movingAverage";

interface Props {
  children: React.ReactNode;
}

interface CryptoContextElements {
  cryptoData: Map<string, CryptoDataFields> | undefined;
}

const CryptoContext = createContext<CryptoContextElements>(
  {} as CryptoContextElements
);

export type CryptoDataFields = {
  increaseRatio: number;
  coefficient?: number;
};

const allowedCoins = ["KRW-BTC"];

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>(
    new Map()
  );
  useEffect(() => {
    getDayCandles("KRW-BTC", 60)
      .then((res) => {
        const data = res;
        const increaseRatio = calcIncreaseRatioOfMA(data, 20);
        setCryptoData(
          (prev) => new Map([...prev, ["KRW-BTC", { increaseRatio }]])
        );
        return data;
      })
      // we need btc data first to calculate others
      .then((btcCandles) => {
        getDayCandles("KRW-ETH", 60).then((res) => {
          const data = res;
          const increaseRatio = calcIncreaseRatioOfMA(data, 20);
          const coefficient = calcCorrelationCoefficient(btcCandles, data);
          console.log(coefficient, "coe ");
          setCryptoData(
            (prev) =>
              new Map([...prev, ["KRW-ETH", { increaseRatio, coefficient }]])
          );
        });
        getDayCandles("KRW-BTG", 60).then((res) => {
          const data = res;
          const increaseRatio = calcIncreaseRatioOfMA(data, 20);
          const coefficient = calcCorrelationCoefficient(btcCandles, data);
          console.log(coefficient, "coe ");
          setCryptoData(
            (prev) =>
              new Map([...prev, ["KRW-BTG", { increaseRatio, coefficient }]])
          );
        });
        getDayCandles("KRW-BTG", 60).then((res) => {
          const data = res;
          const increaseRatio = calcIncreaseRatioOfMA(data, 20);
          const coefficient = calcCorrelationCoefficient(btcCandles, data);
          console.log(coefficient, "coe ");
          setCryptoData(
            (prev) =>
              new Map([...prev, ["KRW-BTG", { increaseRatio, coefficient }]])
          );
        });
        getDayCandles("KRW-XRP", 60).then((res) => {
          const data = res;
          const increaseRatio = calcIncreaseRatioOfMA(data, 20);
          const coefficient = calcCorrelationCoefficient(btcCandles, data);
          console.log(coefficient, "coe ");
          setCryptoData(
            (prev) =>
              new Map([...prev, ["KRW-XRP", { increaseRatio, coefficient }]])
          );
        });
        getDayCandles("KRW-ETH", 60).then((res) => {
          const data = res;
          const increaseRatio = calcIncreaseRatioOfMA(data, 20);
          const coefficient = calcCorrelationCoefficient(btcCandles, data);
          setCryptoData(
            (prev) =>
              new Map([...prev, ["KRW-DOGE", { increaseRatio, coefficient }]])
          );
        });
      });

    getTicker("KRW-BTC").then((res) => {
      console.log(res);
    });

    // upbitApi
    //   .candlesDay("KRW-ETH", 60)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // upbitApi.candlesDay("KRW-DOGE", 60).then((res) => {
    //   console.log(res);
    // });
    // upbitApi.ticker(["KRW-BTC"]).then((res) => {
    //   console.log(res[0]);
    // });
  }, []);

  const [cryptoCodes, setCryptoCodes] = useState<Array<string>>([]);
  return (
    <CryptoContext.Provider value={{ cryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
