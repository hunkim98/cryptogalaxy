import { getDayCandles, getTicker } from "api/upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
import { createContext, useCallback, useEffect, useState } from "react";
import { calcCorrelationCoefficient } from "utils/quant/correlation";
import { calcIncreaseRatioOfMA } from "utils/quant/movingAverage";
import { CoinGeckoSingleMarketData } from "types/coingecko.res";
import { calcSupportResistance } from "utils/quant/support-resistance";
import { CoinGeckoSimplifiedJson } from "./CoinGeckoReal";
import { calcRSI } from "utils/quant/rsi";

interface Props {
  children: React.ReactNode;
}

interface CryptoContextElements {
  cryptoData: Map<string, CryptoDataFields> | undefined;
  markets: Array<string>;
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
  logoImg: string;
  foreColor: string;
  backColor: string;
};

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>(
    new Map()
  );
  const [sunCrypto, setSunCrypto] = useState<string>("KRW-BTC");
  const [markets, setMarkets] = useState<Array<string>>([
    "KRW-ETH",
    "KRW-DOGE",
    "KRW-BCH",
    "KRW-ANKR",
    "KRW-STX",
    "KRW-MATIC",
    "KRW-AAVE",
    "KRW-LINK",
    "KRW-XRP",
    "KRW-CELO",
    "KRW-EOS",
    "KRW-ALGO",
    "KRW-XTZ",
    "KRW-ATOM",
    "KRW-ENJ",
    "KRW-SOL",
    "KRW-NU",
    "KRW-KNC",
    "KRW-ETC",
  ]);
  const retrieveOtherCryptoData = useCallback(
    async (
      market: string,
      dayCount: number,
      btcDayCandles: ICandleDayReturnProps[],
      coinMarketData: Array<
        CoinGeckoSingleMarketData & {
          foreColor: string;
          backColor: string;
          logoImg: string;
        }
      >
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
        5
      );
      const coefficient = calcCorrelationCoefficient(
        btcDayCandles.slice(-10),
        otherCryptoDayCandles.slice(-btcDayCandles.length).slice(-10)
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
          foreColor: coinMarket.foreColor,
          backColor: coinMarket.backColor,
          logoImg: coinMarket.logoImg,
        });
        return newMap;
      });
    },
    []
  );
  const retrieveAllCryptoData = useCallback(
    async (sunCrypto: string) => {
      console.log("retrieving");
      getDayCandles(sunCrypto, 30)
        .then(async (res) => {
          const btcCandles = res;
          const increaseRatio = calcIncreaseRatioOfMA(btcCandles, 20);
          const sunCoinGeckoData = CoinGeckoSimplifiedJson.findIndex(
            (element) =>
              element.symbol === sunCrypto.split("-")[1].toLowerCase()
          );
          if (sunCoinGeckoData === -1) {
            throw Error("no sun data is undefined");
          }
          setCryptoData(
            (prev) =>
              new Map([
                ...prev,
                [
                  "KRW-BTC",
                  {
                    increaseRatio,
                    foreColor:
                      CoinGeckoSimplifiedJson[sunCoinGeckoData].foreColor,
                    backColor:
                      CoinGeckoSimplifiedJson[sunCoinGeckoData].backColor,
                    logoImg: CoinGeckoSimplifiedJson[sunCoinGeckoData].logoImg,
                  },
                ],
              ])
          );
          const coinMarketData = CoinGeckoSimplifiedJson;
          return { btcCandles, coinMarketData };
        })
        // we need btc data first to calculate others
        .then(({ btcCandles, coinMarketData }) => {
          markets.forEach((market) => {
            retrieveOtherCryptoData(market, 200, btcCandles, coinMarketData);
          });
        })
        .catch((err) => console.log(err));
    },
    [markets, retrieveOtherCryptoData]
  );

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
    retrieveAllCryptoData(sunCrypto);
  }, []);

  useEffect(() => {
    const longInterval = setInterval(() => {
      retrieveAllCryptoData(sunCrypto);
    }, 1000 * 60 * 60);
    const shortInterval = setInterval(() => {
      retrieveCurrentPrice();
    }, 1000 * 60 * 5);
    return () => {
      clearInterval(longInterval);
      clearInterval(shortInterval);
    };
  }, [retrieveAllCryptoData, retrieveCurrentPrice]);

  return (
    <CryptoContext.Provider value={{ cryptoData, markets }}>
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
