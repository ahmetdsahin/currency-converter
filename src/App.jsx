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
      EUR: "EU",
      GBP: "GB"
    }[currency] || "US";
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 ">
      <div className="flex flex-col items-center justify-center mt-10 gap-y-5 rounded-lg p-6 w-full max-w-md bg-blue-200 shadow-lg">
        <h1 className="font-bold text-black text-2xl tracking-widest text-center">DÖVİZ KURU UYGULAMASI</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex items-center gap-2 w-full">
            <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="w-8 h-8" />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-2 border rounded-md">
              <option value="USD">USD</option>
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Miktar"
          />
        </div>

        <button onClick={exchange} className="w-full bg-white hover:bg-blue-500 transition delay-150  hover:text-white rounded-md p-2 cursor-pointer text-lg tracking-widest shadow-md ">
          Çevir
        </button>

        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex items-center gap-2 w-full">
            <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="w-8 h-8" />
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-2 border rounded-md">
              <option value="TRY">TRY</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <input
            value={result}
            readOnly
            type="number"
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Sonuç"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
