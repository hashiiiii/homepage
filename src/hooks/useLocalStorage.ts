import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing localStorage state with automatic sync
 * @param key - The localStorage key
 * @param defaultValue - Default value if nothing is stored
 * @param validator - Optional function to validate stored value
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  validator?: (value: unknown) => value is T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get initial value from localStorage
  const getStoredValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        // For simple string values, don't parse as JSON
        if (typeof defaultValue === 'string') {
          const value = item as T;
          if (validator) {
            return validator(value) ? value : defaultValue;
          }
          return value;
        }
        // For complex types, parse as JSON
        const parsed = JSON.parse(item);
        if (validator) {
          return validator(parsed) ? parsed : defaultValue;
        }
        return parsed;
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return defaultValue;
  }, [key, defaultValue, validator]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const newValue =
          typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value;
        setStoredValue(newValue);
        // For simple string values, store directly
        if (typeof newValue === 'string') {
          localStorage.setItem(key, newValue);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          let newValue: T;
          // Handle string values directly
          if (typeof defaultValue === 'string') {
            newValue = e.newValue as T;
          } else {
            newValue = JSON.parse(e.newValue);
          }

          if (validator) {
            if (validator(newValue)) {
              setStoredValue(newValue);
            }
          } else {
            setStoredValue(newValue);
          }
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, validator, defaultValue]);

  return [storedValue, setValue];
}
