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

  const handleCheckTransactions = () => {
    if (target === null) return;

    const seen: Record<number, number> = {};

    for (const transaction of transactions) {
      const complement = target - transaction.amount;

      if (seen[complement] !== undefined) {
        setResult(`Transactions ${seen[complement]} and ${transaction.id} add up to ${target}`);
        return;
      }

      seen[transaction.amount] = transaction.id;
    }
  };

  const handleAddNewTransaction = () => {
    handleAddTransaction(newId, newAmount);
  };

  const handleAddTransaction = (id: number | null, amount: number | null) => {
    if (id === null || amount === null) {
      setResult("Please provide valid ID and amount.");
      return;
    }

    if (amount < 0) {
      setResult("Amount cannot be negative.");
      return;
    }

    if (transactions.some((transaction) => transaction.id === id)) {
      setResult("Transaction with this ID already exists.");
      return;
    }

    setTransactions([...transactions, { id, amount }]);
    setResult("Transaction added successfully.");
  };

  let sum = 0;
  for (const transaction of transactions) {
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
        <li>
          <p>Sum: {sum}</p>
        </li>
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
