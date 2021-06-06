import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { DataProvider } from './components/GlobalState'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Pages from './components/Pages/Pages'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Pages />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
