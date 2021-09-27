import Form from "../Form";
import QuotesList from "../QuotesList";

function Home ({ updateData, sortedList }) {
  return (
    <div className="home">
      <Form updateData={updateData}/>
      <QuotesList sortedList={sortedList} />
    </div>
  );
}

export default Home;
