import './QuotesList.css';

function QuotesList({ sortedList }) {
  return (
    <div className="quotes">
      {sortedList.map((item, index) => (
        <div key={index} className="quote">
          <blockquote>
            <p className="text">{item.quote}</p>
            <p className="author">{item.name}</p>
          </blockquote>
        </div>
      ))}
    </div>
  );
}

export default QuotesList;
