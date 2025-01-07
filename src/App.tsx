import React, { useState, useMemo } from "react";

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
  const [result, setResult] = useState<string>("");
  const [newTransaction, setNewTransaction] = useState<{
    id: number | null;
    amount: number | null;
  }>({ id: null, amount: null });

  const handleCheckTransactions = () => {
    if (target === null) return;

    const seen: Record<number, number> = {};
    for (const transaction of transactions) {
      const complement = target - transaction.amount;
      if (seen[complement] !== undefined) {
        setResult(
          `Transactions ${seen[complement]} and ${transaction.id} add up to ${target}`
        );
        return;
      }
      seen[transaction.amount] = transaction.id;
    }
    setResult("No matching transactions found.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value ? Number(value) : null, // Convert value to a number or null
    }));
  };

  const handleAddTransaction = () => {
    const { id, amount } = newTransaction;

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
    setNewTransaction({ id: null, amount: null }); // Reset form
  };

  const sum = useMemo(() => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }, [transactions]);

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
            name="id"
            placeholder="Enter the Id"
            value={newTransaction.id ?? ""}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Enter the Amount"
            value={newTransaction.amount ?? ""}
            onChange={handleInputChange}
          />
          <button onClick={handleAddTransaction}>Add transaction</button>
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
