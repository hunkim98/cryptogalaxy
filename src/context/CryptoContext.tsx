import { getDayCandles, getTicker } from "api/upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
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
  volume?: number;
};

const allowedCoins = ["KRW-BTC"];

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>(
    new Map()
  );
  const retrieveOtherCryptoData = useCallback(
    async (
      market: string,
      dayCount: number,
      btcDayCandles: ICandleDayReturnProps[]
    ) => {
      const otherCryptoDayCandles = await getDayCandles(market, dayCount);
      const volume = otherCryptoDayCandles[0].candle_acc_trade_price;
      const increaseRatio = calcIncreaseRatioOfMA(otherCryptoDayCandles, 20);
      const coefficient = calcCorrelationCoefficient(
        btcDayCandles,
        otherCryptoDayCandles
      );
      setCryptoData((prev) => {
        const newMap = new Map(prev);
        newMap.set(market, { increaseRatio, coefficient, volume });
        return newMap;
      });
    },
    []
  );
  useEffect(() => {
    getDayCandles("KRW-BTC", 30)
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
        retrieveOtherCryptoData("KRW-ETH", 30, btcCandles);
        retrieveOtherCryptoData("KRW-ETC", 30, btcCandles);
        retrieveOtherCryptoData("KRW-MLK", 30, btcCandles);
        retrieveOtherCryptoData("KRW-BTG", 30, btcCandles);
        retrieveOtherCryptoData("KRW-XRP", 30, btcCandles);
        retrieveOtherCryptoData("KRW-DOGE", 30, btcCandles);
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
