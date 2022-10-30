import axios from "axios";
import CoinGecko from "coingecko-api";
import {
  ICandleDayReturnProps,
  ICandleReturnProps,
  ITickerProps,
} from "node-upbit/lib/@types/quotation";

// const PROXY_API_URL = "https://upbit-next-proxy.vercel.app/api/";

const isDevMode = process.env.NODE_ENV === "development";
const PROXY_API_URL = isDevMode
  ? "/api/"
  : "https://upbit-next-proxy.vercel.app/api/";

export const getDayCandles = async (market: string, count: number) => {
  const res = await axios.get(
    PROXY_API_URL + "days" + `?market=${market}&count=${count}`
  );
  console.log(res);
  return res.data.data as ICandleDayReturnProps[];
};

export const getTicker = async (market: string) => {
  const res = await axios.get(PROXY_API_URL + "ticker" + `?market=${market}`);
  return res.data.data as ITickerProps;
};

export const getMinuteCandles = async (market: string) => {
  const res = await axios.get(PROXY_API_URL + "minutes" + `?market=${market}`);
  return res.data.data as ICandleReturnProps[];
};
