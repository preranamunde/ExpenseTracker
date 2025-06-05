import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

// ✅ use require() instead of import if import fails
const expenseImage = require('../../assets/images/expense.png');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={expenseImage} style={styles.image} resizeMode="contain" />
      <Title style={styles.title}>Expense Tracker</Title>
      <Text style={styles.subtitle}>Track your daily spending effortlessly.</Text>

      <Button
        mode="contained"
        onPress={() => router.push('/add-expense' as any)}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        ➕ Add Expense
      </Button>

      <Button
        mode="outlined"
        onPress={() => router.push('/view-expenses' as any)}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        📊 View Expenses
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom:115,
    backgroundColor: '#fefefe',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 10,
  },
});
