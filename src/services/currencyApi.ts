import ApiService, {ApiServiceType} from "./api.ts";

type CBApiResponse<T> = {
  meta: {
    code: number,
    disclaimer: string
  },
  response: T
}

export type CurrencyCode = string;

export type Currency = {
  code: string;
  decimal_mark: string;
  id: number;
  name: string;
  precision: number;
  short_code: CurrencyCode;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  thousands_separator: string;
};

type ExchangeRate = {
  amount: number;
  date: string;
  from: string;
  timestamp: number;
  to: string;
  value: number;
};

class CurrencyApi {

  constructor(private readonly api: ApiServiceType, private readonly currencyApiKey: string) {

  }

  getSearchParams(url: string, params?: Record<string, string>) {
    return `/${url}?${new URLSearchParams({
      ...params,
      'api_key': this.currencyApiKey
    })}` as `/${string}`
  }

  currencies() {
    return this.api.get<CBApiResponse<Currency[]>>(this.getSearchParams("currencies", {type: 'fiat'}))
  }

  compare(from: CurrencyCode, to: CurrencyCode, amount: number) {
    return this.api.get<CBApiResponse<ExchangeRate>>(this.getSearchParams("convert", { from, to, amount: String(amount) }))
  }
}

const url = import.meta.env.VITE_DB_URL;
const key = import.meta.env.VITE_DB_API_KEY;

if (!url || !key) {
  throw new Error('Not find .env file')
}

const currencyApi = new CurrencyApi(new ApiService(url), key);

export default currencyApi;
