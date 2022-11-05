import { getDayCandles, getTicker } from "api/upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
import { createContext, useCallback, useEffect, useState } from "react";
import { calcCorrelationCoefficient } from "utils/quant/correlation";
import { calcIncreaseRatioOfMA } from "utils/quant/movingAverage";
import CoinGecko from "coingecko-api";
import axios from "axios";
import { CoinGeckoMarketResponse } from "types/coingecko.res";
import { calcSupportResistance } from "utils/quant/support-resistance";
import { CoinGeckoJson } from "./CoinGecko221103";
import { calcRSI } from "utils/quant/rsi";

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
  support?: Array<number>;
  resistance?: Array<number>;
  currentPrice?: number;
  coefficient?: number;
  volume?: number;
  rsi?: number;
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
      btcDayCandles: ICandleDayReturnProps[],
      coinMarketData: CoinGeckoMarketResponse
    ) => {
      const symbol = market.split("-")[1].toLowerCase();
      const coinMarket = coinMarketData.find(
        (market) => market.symbol === symbol
      );
      if (!coinMarket) return;
      const volume = coinMarket.market_cap;
      const otherCryptoDayCandles = await getDayCandles(market, dayCount);
      const increaseRatio = calcIncreaseRatioOfMA(
        otherCryptoDayCandles.slice(-btcDayCandles.length),
        20
      );
      const coefficient = calcCorrelationCoefficient(
        btcDayCandles,
        otherCryptoDayCandles.slice(-btcDayCandles.length)
      );
      const { support, resistance } = calcSupportResistance(
        otherCryptoDayCandles
      );
      const rsi = calcRSI(otherCryptoDayCandles);
      console.log(
        "increase",
        increaseRatio,
        "relation",
        Math.abs(coefficient),
        "rsi",
        rsi,
        symbol
      );
      const ticker = await getTicker(market);
      setCryptoData((prev) => {
        const newMap = new Map(prev);
        newMap.set(market.replace("KRW-", ""), {
          increaseRatio,
          coefficient,
          volume,
          currentPrice: ticker.trade_price,
          support,
          resistance,
          rsi,
        });
        return newMap;
      });
    },
    []
  );
  useEffect(() => {
    getDayCandles("KRW-BTC", 30)
      .then(async (res) => {
        const btcCandles = res;
        const increaseRatio = calcIncreaseRatioOfMA(btcCandles, 20);
        setCryptoData(
          (prev) => new Map([...prev, ["KRW-BTC", { increaseRatio }]])
        );
        const coinMarketData = CoinGeckoJson;
        return { btcCandles, coinMarketData };
      })
      // we need btc data first to calculate others
      .then(({ btcCandles, coinMarketData }) => {
        retrieveOtherCryptoData("KRW-ETH", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-ETC", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-MATIC", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-LINK", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-ADA", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-STORJ", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-AAVE", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-USDT", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-SAND", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-XRP", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-DOGE", 200, btcCandles, coinMarketData);
      })
      .catch((err) => console.log(err));

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
