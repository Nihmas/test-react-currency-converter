import {
  useEffect,
  useState,
} from 'react'
import styles from "./App.module.css"
import {CurrencyForm} from "./components/CurrencyForm/CurrenciesForm.tsx";


function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<unknown[] | null>(null);

  useEffect(() => {
    console.log("state", state);
  }, [state])

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {error && <p>{error.message}</p>}
        {loading && <div>loading</div>}
        <CurrencyForm />
      </div>
    </div>
  )
}

export default App
