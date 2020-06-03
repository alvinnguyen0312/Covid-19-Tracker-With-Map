import React, { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import ReportList from "./components/reports/ReportList";
import Map from "./components/map/Map";

function App() {
  const [location, setLocation] = useState("");
  const selectCountryCard = (idx, report) => {
    setLocation(report);
  };
  return (
    <Provider store={store}>
      <div style={{ display: "flex" }}>
        <Map locationOnMap={location} />
        <ReportList selectCountryCard={selectCountryCard} />
      </div>
    </Provider>
  );
}

export default App;
