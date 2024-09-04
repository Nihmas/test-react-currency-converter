import {CurrencyField} from "../CurrencyField/CurrencyField.tsx";
import styles from "./CurrencyForm.module.css"

export const CurrencyForm = () => {

  return (
    <div className={styles.root}>
      <CurrencyField />
      <CurrencyField />
    </div>
  )
}
