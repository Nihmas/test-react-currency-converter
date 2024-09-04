import {
  useEffect,
} from 'react'
import styles from "./App.module.css"
import {CurrencyForm} from "./components/CurrencyForm/CurrenciesForm.tsx";
import {useFetchHook} from "./hooks/useFetchHook.ts";
import currencyApi from "./services/currencyApi.ts";

function App() {
  const { loading, state, error } = useFetchHook(() => currencyApi.currencies(), (response) => response.data.response);

  useEffect(() => {
    console.log("state", state);
  }, [state])

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {error && <p>{error.message}</p>}
        {loading && <div>loading</div>}
        <CurrencyForm currencies={state || []}/>
      </div>
    </div>
  )
}

export default App
