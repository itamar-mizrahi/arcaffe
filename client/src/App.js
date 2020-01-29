import React from "react";
import Main from "./components/Main";
import "./components/main.scss";

export const Context = React.createContext();

const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  )
};

export default App;
