import React, { useState } from "react";
import "./App.css";
import Form from "./Form/Form";
import Result from "./Result/Result";

function App() {
  const [data, setData] = useState({ amount: 0, currency: "", mid: 0 });

  const handleData = (result) => {
    setData(result);
  };

  return (
    <div className="excashApp">
      <header className="excashHeader">
        <img src="./static/images/logo.svg" className="logotype" alt="Logotyp Excash" />
        <h1 className="excashHeading">Przelicznik walut</h1>
      </header>
      <main>
        <Form data={handleData} />
        <Result amount={data.amount} currency={data.currency} mid={data.mid} />
      </main>
    </div>
  );
}

export default App;
