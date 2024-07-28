import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('http://localhost:5000/transactions', newTransaction);
      setTransactions([response.data, ...transactions]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TransactionList transactions={transactions} />} />
          <Route path="/add" element={<AddTransaction addTransaction={addTransaction} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
