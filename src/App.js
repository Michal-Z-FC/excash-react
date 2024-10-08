import { useState } from "react";
import "./App.css";
import Form from "./Form/Form";
import Result from "./Result/Result";

function App() {
  const [result, setResult] = useState({ amount: 0, currency: "", mid: 0 });

  return (
    <div className="excashApp">
      <header className="excashHeader">
        <img src="./static/images/logo.svg" className="logotype" alt="Logotyp Excash" />
        <h1 className="excashHeading">Przelicznik walut</h1>
      </header>
      <main>
        <Form setResult={setResult} />
        <Result result={result} />
      </main>
    </div>
  );
}

export default App;
