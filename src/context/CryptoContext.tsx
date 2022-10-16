import { createContext, useCallback, useEffect, useState } from "react";
import upbitApi from "upbit-api";
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
    upbitApi.candlesDay("KRW-BTC", 60).then((res) => {
      console.log(res);
      setCryptoData((prev) => {
        return new Map(prev).set("KRW-BTC", {
          increaseRatio: calcIncreaseRatioOfMA(res, 20),
        });
      });
    });
    upbitApi.candlesDay("KRW-ETH", 60).then((res) => {
      console.log(res);
    });
    upbitApi.candlesDay("KRW-DOGE", 60).then((res) => {
      console.log(res);
    });
    upbitApi.ticker(["KRW-BTC"]).then((res) => {
      console.log(res[0]);
    });
  }, []);

  const [cryptoCodes, setCryptoCodes] = useState<Array<string>>([]);
  return (
    <CryptoContext.Provider value={{ cryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
