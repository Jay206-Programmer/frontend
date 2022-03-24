import "./App.css";
import Header from "./components/Header/header";
import LiveChart from "./components/Charts/chart";
import Body from "./components/Body/body";
import EventStream from "./lib/sse/eventStream";
import { useStore } from "./lib/zustand/store";

import { useState, useEffect } from "react";

function App() {
  const [darkmode, setDarkMode] = useState(true);
  const [count, setCount] = useState(0);

  // * Global States
  const updateMatrics = useStore((state) => state.updateMetrics);
  
  const printEventMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const epoch = data["epoch"];
      const accuracy = data["data"]["accuracy"];
      const loss = data["data"]["loss"];
      
      updateMatrics(epoch, accuracy, loss);
    } catch {
      console.log("SSE Failed");
    }
  };

  useEffect(() => {
    const eventObj = new EventStream(
      `http://localhost:8000/events/${count}`,
      printEventMessage
    );

    return () => {
      console.log("Last EventStream Closed");
      eventObj.close();
    };
  }, [count]);

  return (
    <div className={`main ${darkmode ? "dark" : "light"}`}>
      <Header onClick={() => setDarkMode(!darkmode)} />
      <Body>
        <LiveChart subtitle={"Accuracy - Loss"} />
        {/* <LiveChart subtitle={"Loss"} /> */}
      </Body>
      {/* <button onClick={()=>setCount(count+1)}>Click Here</button> */}
    </div>
  );
}

export default App;
