import {
  useState
} from 'react'
import currencyApi, {
  Currency,
  CurrencyCode
} from "../../services/currencyApi.ts";
import {CurrencyField} from "../CurrencyField/CurrencyField.tsx";
import styles from "./CurrencyForm.module.css"

type CurrenciesFormType = {
  currencies: Currency[]
}

export const CurrencyForm = ({ currencies }: CurrenciesFormType) => {
  const [firstCurrency, setFirstCurrency] = useState<CurrencyCode>("USD");
  const [first, setFirst] = useState<number | undefined>(undefined);
  const [lastCurrency, setLastCurrency] = useState<CurrencyCode>("EUR");
  const [last, setLast] = useState<number | undefined>(undefined);

  const onCurrencyChange = (type: 'first' | 'last') => (currencyCode: CurrencyCode) => {
    const isFirst = type === 'first';

    if (isFirst) {
      setFirstCurrency(currencyCode)
    } else {
      setLastCurrency(currencyCode)
    }
  }

  const onChange = async (currencyCode: CurrencyCode, amount: number) => {
    if (!lastCurrency || !firstCurrency) {
      return null;
    }

    const isFirst = firstCurrency === currencyCode;

    if (isFirst) {
      setFirst(amount);
    } else {
      setLast(amount);
    }

    console.log('currency code', currencyCode, amount);

    const response = await currencyApi.compare(currencyCode, isFirst ? lastCurrency : firstCurrency, amount);

    if (!response) {
      return null;
    }

    if (isFirst) {
      setLast(response.data.response.value);
    } else {
      setFirst(response.data.response.value);
    }
  }

  return (
    <div className={styles.root}>
      <CurrencyField list={currencies} onCurrencyChange={onCurrencyChange('first')} onChange={onChange} currencyCode={firstCurrency} value={first} />
      <CurrencyField list={currencies} onCurrencyChange={onCurrencyChange('last')} onChange={onChange} currencyCode={lastCurrency} value={last} />
    </div>
  )
}
