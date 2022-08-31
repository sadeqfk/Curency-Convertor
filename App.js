import React,{ useEffect, useState } from 'react';

import './App.css';
import  CurrencyRow from  './CurrencyRow';
function App() {
  const[ currencyOptions,  setCurrencyOptions ]= useState([])
  const[ fromCurrency, setFromCurrency ]= useState([])
  const[ toCurrency, setToCurrency ]= useState([])
  const[ exchangeRate, setExchangeRate ]= useState()

  
  const[ amount, setAmount ]= useState([1])
  const[ amountInFromCurrency, setAmountInFromCurrency ]= useState(true)
  

  let toAmount , fromAmont
  if (amountInFromCurrency) {
    fromAmont=amount
    toAmount=amount * exchangeRate
  }else {
    toAmount=amount
    fromAmont =amount / exchangeRate
  }


  const BASR_URL = 'https://api.exchangerate.host/latest'
  useEffect(()=>{
    fetch(BASR_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
       

  }, [])

  useEffect(()=>{
    if (fromCurrency !=null && toCurrency !=null ) {
      fetch(`${BASR_URL} ?base= ${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }

    

  }, [fromCurrency, toCurrency])


  function handleFromAmontChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmontChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
    <hr  className='hr' />

    <h1  >Convertor</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmontChange}
          amount={fromAmont}
         />
      <div className='equals' >=</div>
      <CurrencyRow
       currencyOptions={currencyOptions}
       selectCurrency={toCurrency}
       onChangeCurrency={e => setToCurrency(e.target.value)}
       onChangeAmount={handleToAmontChange}

       amount={toAmount}
        
       />
    <hr className='hr'/>

    </>
    

  );
}

export default App;
