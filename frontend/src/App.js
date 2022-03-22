import "./App.css";
import Header from "./components/Header/header";
import LiveChart from "./components/Charts/chart";
import Body from "./components/Body/body";
import EventStream from "./lib/sse/eventStream";

import { useState, useEffect } from "react";

function App() {
  const [darkmode, setDarkMode] = useState(true);
  const [count, setCount] = useState(0)

  const printEventMessage = (event) => {
    try {
      console.log(`Message: ${event.data}`);
    } catch {
      console.log("SSE Failed");
    }
  };

  useEffect(() => {
    const eventObj = new EventStream(`http://localhost:8000/events/${count}`, printEventMessage)

    return () => {
        console.log("Last EventStream Closed")
        eventObj.close()
      }
  }, [count])
  

  return (
    <div className={`main ${darkmode ? "dark" : "light"}`}>
      <Header onClick={() => setDarkMode(!darkmode)} />
      <Body>
        <LiveChart subtitle={"Accuracy"} />
        <LiveChart subtitle={"Loss"} />
      </Body>
      {/* <button onClick={()=>setCount(count+1)}>Click Here</button> */}
    </div>
  );
}

export default App;
