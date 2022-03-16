import "./App.css";
import Header from "./components/Header/header";
import LiveChart from "./components/Charts/chart";
import Body from "./components/Body/body";
import EventStream from "./lib/sse/eventStream";

import { useState, useEffect } from "react";

function App() {
  const [darkmode, setDarkMode] = useState(false);

  const printEventMessage = (event) => {
    try {
      console.log(`Message: ${event.data}`);
    } catch {
      console.log("SSE Failed");
    }
  };

  useEffect(() => {
    const eventObj = new EventStream("http://localhost:8000/events/", printEventMessage)
  }, [])
  

  return (
    <div className={`main ${darkmode ? "dark" : "light"}`}>
      <Header onClick={() => setDarkMode(!darkmode)} />
      <Body>
        <LiveChart subtitle={"Accuracy"} />
        <LiveChart subtitle={"Loss"} />
      </Body>
    </div>
  );
}

export default App;
