import { useState } from "react";
import "./Form.css";
import axios from "axios";

function Form({ setResult }) {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const getCurrency = (amount, currency, form) => {
    const apiUrl = "https://api.nbp.pl/api/exchangerates/rates/A/";

    axios
      .get(`${apiUrl}${currency}/last/?format=json`)
      .then((response) => {
        const dataFromApi = response.data;

        if (typeof dataFromApi !== "object" || !dataFromApi.rates || dataFromApi.rates.length === 0 || !dataFromApi.rates[0].mid) {
          throw new Error("Nieodpowiednia struktura API.");
        }

        const mid = dataFromApi.rates[0].mid;
        const result = { amount: parseFloat(parseFloat(amount).toFixed(2)), currency: currency, mid: mid };
        setResult(result);
        form.reset();
      })
      .catch((err) => {
        setError("Problem z połączeniem z API. Spróbuj ponownie!");
        console.error("Problem z połączeniem z API.", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const checkValidate = (amount) => {
    const regex = /^\s*\d+(\s*\d+)*(\s*[.,]\s*\d+(\s*\d+)*)?$/;

    if (amount.trim() === "") {
      setError("Nie wypełniono pola z kwotą!");
      return false;
    }

    if (!regex.test(amount)) {
      setError("W kwocie pojawiły się niedozwolone znaki!");
      return false;
    }

    if (amount.length > 15) {
      setError("Użyto zbyt dużo znaków! (max 15 znaków)");
      return false;
    }

    if (parseFloat(parseFloat(amount).toFixed(2)) < 0.01) {
      setError("Kwota jest zbyt mała!");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const currency = e.target.currency.value;
    const isValid = checkValidate(amount);

    if (isValid) {
      setLoader(true);
      getCurrency(amount, currency, e.target);
    }
  };

  return (
    <section>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <input type="number" name="amount" step="0.01" className="amountInput" placeholder="Kwota" />
        <div className="selectForm">
          <select className="currenciesList" name="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CHF">CHF</option>
          </select>
        </div>
        <p className="helpBlock">{error}</p>
        <button type="submit" className="calculateBtn">
          Oblicz <div className="loader" style={{ display: loader ? "block" : "none" }}></div>
        </button>
      </form>
    </section>
  );
}

export default Form;
