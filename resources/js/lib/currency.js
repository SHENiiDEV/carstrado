import { useState, useEffect } from 'react';

// Default exchange rate 1 EUR = 0.95 CHF
export const EUR_TO_CHF = 0.95;

export function formatCurrency(amountInEur, currency = 'EUR') {
  if (amountInEur === null || amountInEur === undefined) return '';

  if (currency === 'CHF') {
    const chfAmount = Math.round(amountInEur * EUR_TO_CHF);
    return `CHF ${chfAmount.toLocaleString()}`;
  }

  return `€${Math.round(amountInEur).toLocaleString()}`;
}

export function useCurrency() {
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('autobrokers_currency') || 'EUR';
    }
    return 'EUR';
  });

  const toggleCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('autobrokers_currency', newCurrency);
    }
  };

  return { currency, toggleCurrency, format: (amt) => formatCurrency(amt, currency) };
}
