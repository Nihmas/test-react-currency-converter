import ApiService, {ApiServiceType} from "./api.ts";

class CurrencyApi {

  constructor(private readonly api: ApiServiceType, private readonly currencyApiKey: string) {

  }

  currencies() {
    return ''
  }

  compare() {
    return ''
  }
}

const url = import.meta.env.VITE_DB_URL;
const key = import.meta.env.VITE_DB_API_KEY;

if (!url || !key) {
  throw new Error('Not find .env file')
}

const currencyApi = new CurrencyApi(new ApiService(url), key);

export default currencyApi;
