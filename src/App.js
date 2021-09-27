import React from 'react';
import './App.css';
import quotes from "./mocks/quotes";
import Quote from "./components/Quote";
import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedList: quotes,
      quoteName: '',
      quoteText: '',
    }
  }

  updateData = (sortedList) => {
    this.setState({
      sortedList: sortedList
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/quote'>
            <Quote />
          </Route>
          <Route path='/'>
            <Home sortedList={this.state.sortedList} updateData={this.updateData}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
