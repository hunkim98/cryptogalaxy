import { getDayCandles, getTicker } from "api/upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
import { createContext, useCallback, useEffect, useState } from "react";
import { calcCorrelationCoefficient } from "utils/quant/correlation";
import { calcIncreaseRatioOfMA } from "utils/quant/movingAverage";
import CoinGecko from "coingecko-api";
import axios from "axios";
import { CoinGeckoMarketResponse } from "types/coingecko.res";
import { calcSupportResistance } from "utils/quant/support-resistance";

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
      console.log(increaseRatio, coefficient, symbol);
      const { support, resistance } = calcSupportResistance(
        otherCryptoDayCandles
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
        const coinMarketData = (
          await axios.get<CoinGeckoMarketResponse>(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1&sparkline=false"
          )
        ).data;
        return { btcCandles, coinMarketData };
      })
      // we need btc data first to calculate others
      .then(({ btcCandles, coinMarketData }) => {
        retrieveOtherCryptoData("KRW-ETH", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-ETC", 200, btcCandles, coinMarketData);
        retrieveOtherCryptoData("KRW-APT", 200, btcCandles, coinMarketData);
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
