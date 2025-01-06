import React, { useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
}

const PaymentDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);
  const [target, setTarget] = useState<number | null>(null);
  const [newId, setNewId] = useState<number | null>(null);
  const [newAmount, setNewAmount] = useState<number | null>(null);
  const [result, setResult] = useState<string>('');

  const transactionsMap = {};
  for (let i = 0; i < transactions.length; ++i) {
    transactionsMap[transactions[i].amount] = i;
  }

  const handleCheckTransactions = () => {
    if (target === null) return;

    // TODO: Improve from O(n^2) using the hashmap in line 21
    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        if (transactions[i].amount + transactions[j].amount === target) {
          setResult(`Transactions ${transactions[i].id} and ${transactions[j].id} add up to ${target}`);
          return;
        }
      }
    }
    setResult('No matching transactions found.');
  };

  const handleAddNewTransaction = () => {
    handleAddTransaction(newId, newAmount);
  }

  const handleAddTransaction = (id: number, amount: number) => {
    if (amount < 0) {
      return;
    }
    if (transactions.find(transaction => transaction.id === id)) {
      return;
    }
    setTransactions([...transactions, { id, amount }]);
  };

  let sum = 0;
  for (let transaction of transactions) {
    sum += transaction.amount;
  }

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <input
            type="number"
            placeholder="Id"
            onChange={(e) => setNewId(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => setNewAmount(Number(e.target.value))}
          />
          <button onClick={handleAddNewTransaction}>Add transaction</button>
        </li>
        <li><p>Sum: {sum}</p></li>
        <li>
          <input
            type="number"
            placeholder="Enter target amount"
            onChange={(e) => setTarget(Number(e.target.value))}
          />
          <button onClick={handleCheckTransactions}>Check Transactions</button>
        </li>
      </ul>
      <p>{result}</p>
    </div>
  );
};

export default PaymentDashboard;