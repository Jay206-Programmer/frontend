import "./App.css";
import Header from "./components/Header/header";
import TempChart from "./components/Charts/tempChart";
import Body from "./components/Body/body";

import { useState } from "react";

function App() {
  const [darkmode, setDarkMode] = useState(true);

  return (
    <div className={`main ${darkmode ? "dark" : "light"}`}>
      <Header onClick={() => setDarkMode(!darkmode)} />
      <Body>
        <TempChart />
        <TempChart />
      </Body>
    </div>
  );
}

export default App;
