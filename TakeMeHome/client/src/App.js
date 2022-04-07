import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { HomeProvider } from "./providers/HomeProvider.js";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import Footer from './components/Footer.js';

function App() {
  return (
    <Router>
      <HomeProvider>          
          <Header />
          <ApplicationViews />
          <Footer />         
      </HomeProvider>
    </Router>
  );
}

export default App;