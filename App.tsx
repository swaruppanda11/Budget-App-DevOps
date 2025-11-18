import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';

interface Budget {
  id: string;
  category: string;
  amount: number;
  date: string;
}

function App(): React.JSX.Element {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const addBudget = () => {
    if (category && amount) {
      const newBudget: Budget = {
        id: Date.now().toString(),
        category,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };
      setBudgets([newBudget, ...budgets]);
      setCategory('');
      setAmount('');
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>💰 Budget Tracker</Text>
        <Text style={styles.total}>Total: ${totalBudget.toFixed(2)}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Food)"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={addBudget}>
          <Text style={styles.buttonText}>Add Budget</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.budgetItem}>
            <View>
              <Text style={styles.budgetCategory}>{item.category}</Text>
              <Text style={styles.budgetDate}>{item.date}</Text>
            </View>
            <Text style={styles.budgetAmount}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No budgets yet. Add one above!</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  budgetItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  budgetDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  budgetAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});

export default App;