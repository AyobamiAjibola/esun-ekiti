import { useState, useEffect } from "react";

const getLocalValue = (key: any, initValue: any) => {
  // SSR Next.js
  if (typeof window === 'undefined') return initValue;

  // if a value is already store
  const localValue = JSON.parse(localStorage.getItem(key) as any);
  if (localValue) return localValue; // eslint-disable-line

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
}

const useLocalStorage = (key: any, initValue: any) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue];
}

export default useLocalStorage
