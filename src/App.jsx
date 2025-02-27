import React, { useState } from "react";
import "./App.css";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_2yM4EgUOHaWouim6nRFwjFVGnk1K6mfZTTMWeNyA";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState("");

  const exchange = async () => {
    if (!amount) return;
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      const rate = response.data.data[toCurrency];
      setResult((rate * amount).toFixed(2));
    } catch (error) {
      console.error("Kur bilgisi alınamadı.", error);
    }
  };

  const getFlagUrl = (currency) => {
    const countryCode = {
      USD: "US",
      TRY: "TR",
      EUR: "EU"
    }[currency] || "US";
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center mt-[50px] gap-y-5 rounded-lg p-6 w-[400px] bg-blue-200">
        <h1 className="font-bold text-black text-2xl tracking-wider">DÖVİZ KURU UYGULAMASI</h1>
        
        <div className="flex flex-row gap-x-4 items-center">
          <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="w-8 h-8" />
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-[70px] h-[30px]">
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-[100px] h-[25px] border-2 rounded-lg p-4 bg-white"
          />
        </div>

        <button onClick={exchange} className="w-[170px] bg-white rounded-lg p-2 cursor-pointer text-lg tracking-widest">
          Çevir
        </button>

        <div className="flex flex-row gap-x-4 items-center">
          <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="w-8 h-8" />
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-[70px] h-[30px]">
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            value={result}
            readOnly
            type="number"
            className="w-[100px] h-[25px] border-2 rounded-lg p-4 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default App;