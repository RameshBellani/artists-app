import React from 'react';
import { Link } from 'react-router-dom';
import './TransactionList.css';

function TransactionList({ transactions }) {
  const calculateRunningBalance = (transactions) => {
    let balance = 0;
    const reversedTransactions = [...transactions].reverse();

    return reversedTransactions.map((transaction) => {
      balance = transaction.type === 'Credit'
        ? balance + transaction.amount
        : balance - transaction.amount;
      return { ...transaction, balance };
    }).reverse();
  };

  const transactionsWithBalance = calculateRunningBalance(transactions);

  return (
    <div className="transaction-list">
      <div className="header">
        <h1>Office Transactions</h1>
        <Link to="/add" className="add-transaction-link">+ Add Transaction</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionsWithBalance.map((transaction, index) => (
            <tr key={index}>
              <td data-label="Date">{new Date(transaction.date).toLocaleDateString()}</td>
              <td data-label="Description">{transaction.description}</td>
              <td data-label="Credit">{transaction.type === 'Credit' ? transaction.amount : ''}</td>
              <td data-label="Debit">{transaction.type === 'Debit' ? transaction.amount : ''}</td>
              <td data-label="Running Balance">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
