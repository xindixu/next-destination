import React, { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/navigation";
import { setLocation } from "./lib/util";

export const CityHuntContext = React.createContext({});
function App() {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    setLocation(setCoordinates);
  }, []);
  return (

    <CityHuntContext.Provider value={{ coordinates }}>
      <div className="App">
        <Navigation />
      </div>
    </CityHuntContext.Provider>
  );
}

export default App;
