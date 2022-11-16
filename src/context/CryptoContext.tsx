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

const allowedCoins = [
  "KRW-ETH",
  "KRW-ETC",
  "KRW-MATIC",
  "KRW-LINK",
  "KRW-ADA",
  "KRW-STORJ",
  "KRW-AAVE",
  "KRW-SAND",
  "KRW-XRP",
  "KRW-DOGE",
];

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>(
    new Map()
  );
  const [markets, setMarkets] = useState<Array<string>>([
    "KRW-ETH",
    "KRW-ETC",
    "KRW-MATIC",
    "KRW-LINK",
    "KRW-ADA",
    "KRW-STORJ",
    "KRW-AAVE",
    "KRW-SAND",
    "KRW-XRP",
    "KRW-DOGE",
  ]);
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
  const retrieveAllCryptoData = useCallback(async () => {
    console.log("retrieving");
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
        markets.forEach((market) => {
          retrieveOtherCryptoData(market, 200, btcCandles, coinMarketData);
        });
      })
      .catch((err) => console.log(err));
  }, [markets, retrieveOtherCryptoData]);

  const retrieveCurrentPrice = useCallback(async () => {
    markets.forEach(async (market) => {
      const ticker = await getTicker(market);
      const previousData = cryptoData.get(market.replace("KRW-", ""));
      if (previousData) {
        setCryptoData((prev) => {
          const newMap = new Map(prev);
          newMap.set(market.replace("KRW-", ""), {
            ...previousData,
            currentPrice: ticker.trade_price,
          });
          return newMap;
        });
      }
    });
  }, [markets, cryptoData]);

  useEffect(() => {
    retrieveAllCryptoData();
  }, []);

  useEffect(() => {
    const longInterval = setInterval(() => {
      retrieveAllCryptoData();
    }, 1000 * 60 * 60);
    const shortInterval = setInterval(() => {
      retrieveCurrentPrice();
    }, 1000 * 10);
    return () => {
      clearInterval(longInterval);
      clearInterval(shortInterval);
    };
  }, [retrieveAllCryptoData, retrieveCurrentPrice]);

  const [cryptoCodes, setCryptoCodes] = useState<Array<string>>([]);
  return (
    <CryptoContext.Provider value={{ cryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
