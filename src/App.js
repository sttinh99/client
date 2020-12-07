import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './components/GlobalState'

import Header from './components/Header/Header'
import Pages from './components/Pages/Pages'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
