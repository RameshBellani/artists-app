import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTransaction.css';

function AddTransaction({ addTransaction }) {
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date: new Date().toISOString().split('T')[0],
      type,
      amount: parseFloat(amount),
      description,
    };
    addTransaction(newTransaction);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-transaction">
      <h1>Add Transaction</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>Type:</label></td>
              <td>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Amount:</label></td>
              <td>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="buttons">
                <button type="submit">SAVE</button>
                <button type="button" onClick={handleCancel}>CANCEL</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddTransaction;
