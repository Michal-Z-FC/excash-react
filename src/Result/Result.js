import "./Result.css";

function Result({ result }) {
  const calculateAndDisplayResult = (amount, mid) => {
    const computedAmount = parseFloat(amount);
    const value = (computedAmount * mid).toFixed(2);
    return value;
  };

  const { amount, currency, mid } = result;
  const displayResult = amount && mid && currency ? calculateAndDisplayResult(amount, mid) : "";

  return (
    <section className="resultContainer">
      <h2 className="result">
        {displayResult !== "" ? `${amount} ${currency} to ` : ""}
        <span className="highlighted">{displayResult !== "" ? `${displayResult} PLN` : ""}</span>
      </h2>
    </section>
  );
}

export default Result;
