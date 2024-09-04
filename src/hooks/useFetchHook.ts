import {
  useEffect,
  useState
} from "react";

export const useFetchHook = <T, U>(fn: () => Promise<T>, mapper: (v: T) => U) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<U | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fn();
        setState(mapper(response));
      } catch (e: unknown) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    })()

  }, [])

  return {loading, error, state}
}
