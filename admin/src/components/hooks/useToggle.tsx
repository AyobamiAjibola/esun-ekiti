import useLocalStorage from "./useLocalStorage";

const useToggle = (key: any, initValue: any) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const toggle = (val: any) => {
    setValue((prev: any) => {
      return typeof val === 'boolean' ? val : !prev; // eslint-disable-line
    })
  }

  return [value, toggle];
}

export default useToggle
