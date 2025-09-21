// Utility functions for localStorage operations

export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return undefined;
    return JSON.parse(serializedData);
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
    return undefined;
  }
};

export default {
  saveToLocalStorage,
  loadFromLocalStorage
};