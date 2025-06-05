// File: app/(tabs)/add-expense.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {
    Button,
    HelperText,
    TextInput,
    Title
} from 'react-native-paper';

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (!category.trim()) {
      setError('Category cannot be empty');
      return false;
    }
    setError('');
    return true;
  };

  const saveExpense = async () => {
    if (!validate()) return;

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(amount).toFixed(2),
      category: category.trim(),
      date: date.toISOString(),
    };

    try {
      const stored = await AsyncStorage.getItem('expenses');
      const expenses = stored ? JSON.parse(stored) : [];
      expenses.push(newExpense);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      router.push('view-expenses' as any);
    } catch (e) {
      setError('Failed to save expense. Try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title style={styles.title}>Add New Expense</Title>
          <TextInput
            label="Amount (₹)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Category"
            value={category}
            onChangeText={setCategory}
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="outlined"
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            Select Date: {date.toDateString()}
          </Button>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
              maximumDate={new Date()}
            />
          )}

          {!!error && <HelperText type="error">{error}</HelperText>}

          <Button
            mode="contained"
            onPress={saveExpense}
            style={styles.saveButton}
            contentStyle={{ paddingVertical: 8 }}
          >
            Save Expense
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop:80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    color: '#6200ee',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    marginVertical: 8,
  },
  dateButton: {
    marginVertical: 12,
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});
