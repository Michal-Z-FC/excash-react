import "./Result.css";

function Result({ amount = 0, mid = 0, currency = "" }) {
  return (
    <section className="resultContainer">
      <h2 className="result">{amount && mid && currency ? calculateAndDisplayResult(amount, mid, currency) : ""}</h2>
    </section>
  );
}

function calculateAndDisplayResult(amount, mid, currency) {
  amount = parseFloat(amount);
  amount = Math.ceil(amount * 100) / 100;
  mid = Math.ceil(mid * 100) / 100;

  const value = amount * mid;
  return (
    <>
      {amount} {currency} to <span className="highlighted">{Math.round(value * 100) / 100}&nbsp;PLN</span>
    </>
  );
}

export default Result;
