"use client";
import React, { useState } from "react";

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [result, setResult] = useState("");

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult("");
    };

    // Dummy rates table for demonstration
    const dummyRates = {
        'USD_EUR': 0.92,
        'USD_GBP': 0.78,
        'USD_JPY': 150.5,
        'USD_INR': 83.1,
        'EUR_USD': 1.09,
        'EUR_GBP': 0.85,
        'EUR_JPY': 163.2,
        'EUR_INR': 90.2,
        'GBP_USD': 1.28,
        'GBP_EUR': 1.18,
        'GBP_JPY': 192.1,
        'GBP_INR': 106.3,
        'JPY_USD': 0.0066,
        'JPY_EUR': 0.0061,
        'JPY_GBP': 0.0052,
        'JPY_INR': 0.55,
        'INR_USD': 0.012,
        'INR_EUR': 0.011,
        'INR_GBP': 0.0094,
        'INR_JPY': 1.82,
    };

    const handleConvert = () => {
        let amt = amount;
        if (typeof amt === 'string') {
            amt = amt.trim() === '' ? NaN : parseFloat(amt);
        }
        if (isNaN(amt) || amt < 0) {
            setResult("Enter a valid amount");
            return;
        }
        if (fromCurrency === toCurrency) {
            setResult(Number(amt).toFixed(2));
            return;
        }
        const key = `${fromCurrency}_${toCurrency}`;
        const dummyRate = dummyRates[key] !== undefined ? dummyRates[key] : 1;
        setResult((amt * dummyRate).toFixed(2));
    };

    // Reset result when amount or currencies change
    React.useEffect(() => {
        setResult("");
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="currency-converter cc-app-container cc-app-bg" style={{ margin: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
            <div className="cc-converter-card">
                <h2 className="cc-converter-title">Currency Converter</h2>
                <div className="cc-converter-controls">
                    <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => {
                            const val = e.target.value;
                            setAmount(val === '' ? '' : Number(val));
                        }}
                        className="cc-amount-input"
                    />

                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="cc-currency-select"
                    >
                        {currencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleSwap} className="cc-swap-btn">
                        ⇆
                    </button>

                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="cc-currency-select"
                    >
                        {currencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="cc-convert-btn-wrapper">
                    <button onClick={handleConvert} className="cc-convert-btn">
                        Convert
                    </button>
                </div>

                {result && (
                    <div className="cc-result-text">
                        {amount} {fromCurrency} = {result} {toCurrency}
                    </div>
                )}
            </div>
        </div>
    );
}