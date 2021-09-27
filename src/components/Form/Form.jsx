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

  useEffect(()=> {
    const savedValue = sessionStorage.getItem('filteredValue');
    if(savedValue) {
      searchItem(savedValue);
    }
  })

  function setSorting (e) {
    let sortBy = e.target.dataset.sort;
    console.log(sortBy)
    let sortingCase = sortBy === 'name' ? nameSort : textSort
    switch(sortingCase) {
      case SORT_BUTTON_STATE.DEFAULT:
        const upQuotes = [...quotes];
        if (sortBy === 'name') {
          setNameSort(SORT_BUTTON_STATE.UP);
        } else {
          setTextSort(SORT_BUTTON_STATE.UP);
        }
        upQuotes.sort((prev, next) => {
          const nextLover = next[sortBy].toLowerCase()
          const prevLover = prev[sortBy].toLowerCase()
          return prevLover.localeCompare(nextLover);
        });
        updateData(upQuotes);
        break

      case SORT_BUTTON_STATE.UP:
        const downQuotes = [...quotes];
        if (sortBy === 'name') {
          setNameSort(SORT_BUTTON_STATE.DOWN);
        } else {
          setTextSort(SORT_BUTTON_STATE.DOWN);
        }
        downQuotes.sort((prev, next) => {
          const nextLover = next[sortBy].toLowerCase()
          const prevLover = prev[sortBy].toLowerCase()
          return nextLover.localeCompare(prevLover);
        });
        updateData(downQuotes);
        break

      case SORT_BUTTON_STATE.DOWN:
        if (sortBy === 'name') {
          setNameSort(SORT_BUTTON_STATE.DEFAULT);
        } else {
          setTextSort(SORT_BUTTON_STATE.DEFAULT);
        }
        updateData(quotes);
        break
      default:
        break
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

  function getRandomQuote () {
    const quoteIndex = randomInteger(0, filteredQuotes.length);
    const quoteItem = filteredQuotes[quoteIndex];

    function randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

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
      <form>
        <input
          type="search"
          placeholder="Start typing"
          onChange={(e)=>searchItem(e.target.value)}
          value={inputValue}
        />
      </form>
      <button className="name" data-sort="name" onClick={setSorting}>
        Sort by Name
        {nameSort === SORT_BUTTON_STATE.UP && <span className=" arrow up">&#x2191;</span>}
        {nameSort === SORT_BUTTON_STATE.DOWN && <span className="down">&#x2193;</span>}
      </button>
      <button className="text" data-sort="quote" onClick={setSorting}>
        Sort by Text
        {textSort === SORT_BUTTON_STATE.UP && <span className=" arrow up">&#x2191;</span>}
        {textSort === SORT_BUTTON_STATE.DOWN && <span className="down">&#x2193;</span>}
      </button>
      <button className="random" onClick={getRandomQuote}>
        Random
      </button>
    </div>
  );
}

export default Form;
