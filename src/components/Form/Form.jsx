import './Form.css';
import {useState, useEffect} from "react";
import quotes from '../../mocks/quotes'
import { SORT_BUTTON_STATE } from "../../constants";
import { useHistory } from "react-router-dom";

function Form({ updateData }) {
  const [nameSort, setNameSort] = useState(SORT_BUTTON_STATE.DEFAULT);
  const [textSort, setTextSort] = useState(SORT_BUTTON_STATE.DEFAULT);
  const [inputValue, setInputValue] = useState('')
  const [filteredQuotes, setFilteredQuotes] = useState(quotes)
  let history = useHistory();

  useEffect(()=>{
    const savedValue = sessionStorage.getItem('filteredValue');
    if(savedValue) {
      searchItem(savedValue);
    }
  }, [])

  function setNameSorting () {
    if (nameSort === SORT_BUTTON_STATE.DEFAULT) {
      const upQuotes = [...quotes];
      setNameSort(SORT_BUTTON_STATE.UP);
      upQuotes.sort((prev, next) => {
        const nextLover = next.name.toLowerCase()
        const prevLover = prev.name.toLowerCase()
        return prevLover.localeCompare(nextLover);
      });
      updateData(upQuotes);
    }
    if (nameSort === SORT_BUTTON_STATE.UP) {
      const downQuotes = [...quotes];
      setNameSort(SORT_BUTTON_STATE.DOWN)
      downQuotes.sort((prev, next) => {
        const nextLover = next.name.toLowerCase()
        const prevLover = prev.name.toLowerCase()
        return nextLover.localeCompare(prevLover);
      });
      updateData(downQuotes);
    }
    if (nameSort === SORT_BUTTON_STATE.DOWN) {
      setNameSort(SORT_BUTTON_STATE.DEFAULT)
      updateData(quotes);
    }
  }

  function setTextSorting () {
    if (textSort === SORT_BUTTON_STATE.DEFAULT) {
      const upQuotes = [...quotes];
      setTextSort(SORT_BUTTON_STATE.UP);
      upQuotes.sort((prev, next) => {
        const nextLover = next.quote.toLowerCase()
        const prevLover = prev.quote.toLowerCase()
        return prevLover.localeCompare(nextLover);
      });
      updateData(upQuotes);
    }
    if (textSort === SORT_BUTTON_STATE.UP) {
      const downQuotes = [...quotes];
      setTextSort(SORT_BUTTON_STATE.DOWN)
      downQuotes.sort((prev, next) => {
        const nextLover = next.quote.toLowerCase()
        const prevLover = prev.quote.toLowerCase()
        return nextLover.localeCompare(prevLover);
      });
      updateData(downQuotes);
    }
    if (textSort === SORT_BUTTON_STATE.DOWN) {
      setTextSort(SORT_BUTTON_STATE.DEFAULT)
      updateData(quotes);
    }
  }

  function searchItem (value) {
    setInputValue(value);
    if (value === '') {
      setFilteredQuotes(quotes);
      updateData(quotes);
      sessionStorage.removeItem('filteredValue');
      return;
    }
    const filterQuotes = quotes.filter((item) => {
      return (item.name.includes(value) || item.quote.includes(value))
    })
    setFilteredQuotes(filterQuotes);
    updateData(filterQuotes);
    sessionStorage.setItem('filteredValue', value);
  }

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function getRandomQuote () {
    const quoteIndex = randomInteger(0, filteredQuotes.length);
    const quoteItem = filteredQuotes[quoteIndex];

    history.push({
      pathname: "/quote",
      state: {
        quoteName: quoteItem.name,
        quoteText: quoteItem.quote
      }
    });
  }

  return (
    <div className="form">
      <button className="name" onClick={setNameSorting}>
        Sort by Name
        {nameSort === SORT_BUTTON_STATE.UP && <span className=" arrow up">&#x2191;</span>}
        {nameSort === SORT_BUTTON_STATE.DOWN && <span className="down">&#x2193;</span>}
      </button>
      <button className="text" onClick={setTextSorting}>
        Sort by Text
        {textSort === SORT_BUTTON_STATE.UP && <span className=" arrow up">&#x2191;</span>}
        {textSort === SORT_BUTTON_STATE.DOWN && <span className="down">&#x2193;</span>}
      </button>
      <button className="random" onClick={getRandomQuote}>
        Random
      </button>
      <form>
        <input
          type="search"
          placeholder="Start typing"
          onChange={(e)=>searchItem(e.target.value)}
          value={inputValue}
        />
      </form>
    </div>
  );
}

export default Form;
