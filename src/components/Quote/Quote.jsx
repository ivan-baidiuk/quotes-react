import { Link, useLocation } from "react-router-dom";

function Quote () {
  const { quoteName, quoteText } = useLocation().state
  return (
    <div className="quote">
      <Link to="/">
        Home
      </Link>
      <h1>{quoteName}</h1>
      <p>{quoteText}</p>
    </div>
  );
}

export default Quote;
