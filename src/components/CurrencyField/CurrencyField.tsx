import {
  SyntheticEvent
} from "react";
import {
  Currency,
  CurrencyCode
} from "../../services/currencyApi.ts";
import styles from './CurrencyField.module.css'

type CurrencyFieldProps = {
  list: Currency[];
  value?: number;
  onChange: (currencyCode: CurrencyCode, value: number) => void;
  onCurrencyChange: (currencyCode: CurrencyCode) => void;
  currencyCode: CurrencyCode | undefined;
}

export const CurrencyField = ({ list, onCurrencyChange, onChange, currencyCode, value }: CurrencyFieldProps) => {
  const onSelect = (event: SyntheticEvent<HTMLSelectElement, Event>) => {
    onCurrencyChange(event.target.value)
  }

  const onInputChange = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    if (currencyCode) {
      onChange(currencyCode, event.target.value)
    }
  }

  return (
    <div className={styles.root}>
      <input type="number" className={styles.input} value={value} onChange={onInputChange} />
      <select onChange={onSelect} className={styles.select} value={currencyCode}>
        {list.map(({ short_code, name }) => (<option value={short_code} key={short_code}>{name}</option>))}
      </select>
    </div>
  )
}
