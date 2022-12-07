import { getDayCandles, getTicker } from "api/upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
import { createContext, useCallback, useEffect, useState } from "react";
import { calcCorrelationCoefficient } from "utils/quant/correlation";
import { calcIncreaseRatioOfMA } from "utils/quant/movingAverage";
import { CoinGeckoSingleMarketData } from "types/coingecko.res";
import { calcSupportResistance } from "utils/quant/support-resistance";
import { CoinGeckoSimplifiedJson } from "./CoinGeckoReal";
import { calcRSI } from "utils/quant/rsi";
import { calcMFI } from "utils/quant/mfi";

export enum Language {
  KOREAN = "ko",
  ENGLISH = "en",
}
interface Props {
  children: React.ReactNode;
}

interface CryptoContextElements {
  cryptoData: Map<string, CryptoDataFields> | undefined;
  markets: Array<string>;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const CryptoContext = createContext<CryptoContextElements>(
  {} as CryptoContextElements
);

export type CryptoDataFields = {
  increaseRatio: number;
  support?: Array<number>;
  resistance?: Array<number>;
  currentPrice: number;
  coefficient?: number;
  volume: number;
  rsi: number;
  mfi: number;
  logoImg: string;
  foreColor: string;
  backColor: string;
};

const CryptoContextProvider: React.FC<Props> = ({ children }) => {
  const [cryptoData, setCryptoData] = useState<Map<string, CryptoDataFields>>(
    new Map()
  );
  const [language, setLanguage] = useState<Language>(Language.KOREAN);
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
    "KRW-MANA",
    "KRW-SAND",
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
      otherCryptoDayCandles.pop();
      const increaseRatio = calcIncreaseRatioOfMA(
        otherCryptoDayCandles.slice(-10),
        5
      );
      const coefficient = calcCorrelationCoefficient(
        btcDayCandles.slice(-10),
        otherCryptoDayCandles.slice(-10)
      );
      const { support, resistance } = calcSupportResistance(
        otherCryptoDayCandles
      );
      const rsi = calcRSI(otherCryptoDayCandles);
      // console.log(
      //   "increase",
      //   increaseRatio,
      //   "relation",
      //   Math.abs(coefficient),
      //   "rsi",
      //   rsi,
      //   symbol
      // );
      const mfi = calcMFI(otherCryptoDayCandles);
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
          mfi,
        });
        return newMap;
      });
    },
    []
  );
  const retrieveAllCryptoData = useCallback(
    async (sunCrypto: string) => {
      getDayCandles(sunCrypto, 30)
        .then(async (res) => {
          const btcCandles = res;
          btcCandles.pop(); // we don't care the last candle(today candle)
          const increaseRatio = calcIncreaseRatioOfMA(btcCandles.slice(-10), 5);
          console.log(increaseRatio, "btc");
          const sunCoinGeckoData = CoinGeckoSimplifiedJson.findIndex(
            (element) =>
              element.symbol === sunCrypto.split("-")[1].toLowerCase()
          );
          const rsi = calcRSI(btcCandles);
          if (sunCoinGeckoData === -1) {
            throw Error("no sun data is undefined");
          }
          const mfi = calcMFI(btcCandles);
          const ticker = await getTicker(sunCrypto);
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
                    volume:
                      CoinGeckoSimplifiedJson[sunCoinGeckoData].market_cap,
                    currentPrice: ticker.trade_price,
                    rsi,
                    mfi,
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
    const sunTicker = await getTicker(sunCrypto);
    const previousSunTicker = cryptoData.get(sunCrypto.replace("KRW-", ""));

    if (previousSunTicker) {
      setCryptoData((prev) => {
        const newMap = new Map(prev);
        newMap.set(sunCrypto.replace("KRW-", ""), {
          ...previousSunTicker,
          currentPrice: sunTicker.trade_price,
        });
        return newMap;
      });
    }

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
  }, [markets, cryptoData, sunCrypto]);

  useEffect(() => {
    retrieveAllCryptoData(sunCrypto);
  }, [sunCrypto, retrieveAllCryptoData]);

  useEffect(() => {
    const longInterval = setInterval(() => {
      retrieveAllCryptoData(sunCrypto);
    }, 1000 * 60 * 30);
    const shortInterval = setInterval(() => {
      retrieveCurrentPrice();
    }, 1000 * 60 * 2);
    return () => {
      clearInterval(longInterval);
      clearInterval(shortInterval);
    };
  }, [retrieveAllCryptoData, retrieveCurrentPrice, sunCrypto]);

  return (
    <CryptoContext.Provider
      value={{ cryptoData, markets, language, setLanguage }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export { CryptoContext, CryptoContextProvider };
