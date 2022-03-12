import "./App.css";
import Header from "./components/Header/header";

import { useState } from 'react';

function App() {
  const [darkmode, setDarkMode] = useState(true)

  return (
    <div className={`main ${darkmode?"dark":"light"}`}> 
      <Header onClick={()=> setDarkMode(!darkmode)}/>
    </div>
  );
}

export default App;
