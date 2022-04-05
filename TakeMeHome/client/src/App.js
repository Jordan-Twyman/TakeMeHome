import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { HomeProvider } from "./providers/HomeProvider.js";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <HomeProvider>          
          <Header />
          <ApplicationViews />         
      </HomeProvider>
    </Router>
  );
}

export default App;