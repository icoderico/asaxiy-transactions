import { useState, useEffect } from "react";

const useDebounce = (initialQuery = "", delay = 500) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return { query, setQuery, debouncedQuery };
};

export default useDebounce;
