import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';

export const saveExpense = async (expense) => {
  try {
    const stored = await AsyncStorage.getItem(EXPENSES_KEY);
    const expenses = stored ? JSON.parse(stored) : [];
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

export const loadExpenses = async () => {
  try {
    const stored = await AsyncStorage.getItem(EXPENSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const stored = await AsyncStorage.getItem(EXPENSES_KEY);
    const expenses = stored ? JSON.parse(stored) : [];
    const filtered = expenses.filter((item) => item.id !== id);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};
