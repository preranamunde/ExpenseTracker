import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { Card, IconButton, Text, Title } from 'react-native-paper';

type Expense = {
  id: string;
  amount: string;
  category: string;
  date: string;
};

export default function ViewExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = async () => {
    setRefreshing(true);
    try {
      const stored = await AsyncStorage.getItem('expenses');
      if (stored) {
        setExpenses(JSON.parse(stored));
      } else {
        setExpenses([]);
      }
    } catch {
      Alert.alert('Error', 'Failed to load expenses');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const deleteExpense = (id: string) => {
    Alert.alert('Delete Expense', 'Are you sure you want to delete?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const filtered = expenses.filter((item) => item.id !== id);
          setExpenses(filtered);
          await AsyncStorage.setItem('expenses', JSON.stringify(filtered));
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <Card style={styles.card} mode="outlined">
    <Card.Title
  title={`₹${item.amount} - ${item.category}`}
  subtitle={new Date(item.date).toDateString()}
  right={() => (
    <IconButton
      icon="delete"
      iconColor="#B00020" // ✅ Use `iconColor` instead of `color`
      onPress={() => deleteExpense(item.id)}
    />
  )}
/>

    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Recent Expenses</Title>
      <FlatList
        data={expenses.slice().reverse()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadExpenses} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses recorded yet.</Text>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:80,
    backgroundColor: '#fff',
  } as ViewStyle,
  title: {
    marginBottom: 16,
    color: '#6200ee',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  } as TextStyle,
  card: {
    marginVertical: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999',
    fontSize: 16,
  } as TextStyle,
});
