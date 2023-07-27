import React, { useState } from 'react';
import axios from 'axios';

const StockDataForm = () => {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState('');
  const [tradeData, setTradeData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/fetchStockData', { symbol, date });
      setTradeData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      
    }
  };

  return (
    <div>
      <h2>Fetch Stock Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Stock Symbol:
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Date (YYYY-MM-DD):
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Fetch Data</button>
      </form>
      {tradeData && (
        <div>
          <h3>Trade Data:</h3>
          <p>Symbol: {tradeData.symbol}</p>
          <p>Open: {tradeData.open}</p>
          <p>Close: {tradeData.close}</p>
          <p>High: {tradeData.high}</p>
          <p>Low: {tradeData.low}</p>
          <p>Volume: {tradeData.volume}</p>
          <p>Date: {tradeData.date}</p>
        </div>
      )}
    </div>
  );
};

export default StockDataForm;