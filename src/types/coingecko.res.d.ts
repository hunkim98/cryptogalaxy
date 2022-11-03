export type CoinGeckoMarketResponse = CoinGeckoSingleMarketData[];

export type CoinGeckoSingleMarketData = {
  id: string;
  symbol: string; //btc, eth, etc
  name: string;
  image: string; // image url
  current_price: number;
  market_cap: number;
  market_cap_rank: number; //1 is btc
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
};
