import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
//
//   const [storedValue, setStoredValue] = useState(initialValue);
//   // We will use this flag to trigger the reading from localStorage
//   const [firstLoadDone, setFirstLoadDone] = useState(false);
//
//   // Use an effect hook in order to prevent SSR inconsistencies and errors.
//   // This will update the state with the value from the local storage after
//   // the first initial value is applied.
//   useEffect(() => {
//     const fromLocal = () => {
//       if (typeof window === 'undefined') {
//         return initialValue;
//       }
//       try {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) as T : initialValue;
//       } catch (error) {
//         console.error(error);
//         return initialValue;
//       }
//     };
//
//     // Set the value from localStorage
//     setStoredValue(fromLocal);
//     // First load is done
//     setFirstLoadDone(true);
//   }, [initialValue, key]);
//
//   // Instead of replacing the setState function, react to changes.
//   // Whenever the state value changes, save it in the local storage.
//   useEffect(() => {
//     // If it's the first load, don't store the value.
//     // Otherwise, the initial value will overwrite the local storage.
//     if (!firstLoadDone) {
//       return;
//     }
//
//     try {
//       if (typeof window !== 'undefined') {
//         window.localStorage.setItem(key, JSON.stringify(storedValue));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [storedValue, firstLoadDone, key]);
//
//   // Return the original useState functions
//   return [storedValue, setStoredValue];
// }

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {

  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };

  // Set initial value from local storage or initial value
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update local storage when storedValue changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, key]);

  // Optional: Add an event listener to listen for local storage changes
  // This is useful if local storage is modified outside of this hook
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue];
}
