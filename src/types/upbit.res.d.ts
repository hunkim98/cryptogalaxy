import upbitApi from "upbit-api";

export default class Upbit {
  getMarketCodes = upbitApi.allMarket;
  getTicker = upbitApi.ticker;
  getOrderBook = upbitApi.orderBook;
  getTradesTicks = upbitApi.ticks;
  getCandlesMinutes = upbitApi.candlesMinutes;
  getCandlesDays = upbitApi.candlesDay;
  getCandlesWeeks = upbitApi.candlesWeek;
  getCandlesMonths = upbitApi.candlesMonth;
}
