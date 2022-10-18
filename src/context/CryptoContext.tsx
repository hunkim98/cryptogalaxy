import { getDayCandles, getTicker } from "api/upbit";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
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
};

const allowedCoins = ["KRW-BTC"];

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>();
  useEffect(() => {
    getDayCandles("KRW-BTC", 60).then((res) => {
      const data = res;
      const increaseRatio = calcIncreaseRatioOfMA(data, 20);
      setCryptoData(new Map([["KRW-BTC", { increaseRatio }]]));
    });
    getDayCandles("KRW-ETH", 60).then((res) => {
      const data = res;
      const increaseRatio = calcIncreaseRatioOfMA(data, 20);
      setCryptoData(new Map([["KRW-ETH", { increaseRatio }]]));
    });
    getDayCandles("KRW-ETH", 60).then((res) => {
      const data = res;
      const increaseRatio = calcIncreaseRatioOfMA(data, 20);
      setCryptoData(new Map([["KRW-DOGE", { increaseRatio }]]));
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
