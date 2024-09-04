import styles from './CurrencyField.module.css'

export const CurrencyField = () => {

  return (
    <div className={styles.root}>
      <input type="number" className={styles.input}/>
      <select className={styles.select}>
        <option>test</option>
      </select>
    </div>
  )
}
