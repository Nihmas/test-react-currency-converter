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

  return (
    <div className={styles.root}>
      <CurrencyField />
      <CurrencyField />
    </div>
  )
}
