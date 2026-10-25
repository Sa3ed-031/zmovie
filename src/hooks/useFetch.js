import { useState, useEffect, useCallback } from "react";

import { STRINGS } from "../constants/strings";

const useFetch = (fetchFn, dependencies = [], initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // to Avoid memory lack

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || STRINGS.common.errorGeneric);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = useCallback(() => {
    let isMounted = true;

    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || STRINGS.common.errorGeneric);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    execute();
    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error, refetch };
};

export default useFetch;
