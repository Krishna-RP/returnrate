import React from "react";
import "./index.css";
import "./App.css";
//components
import InputForm from "./components/Inputform";
import { Header } from "semantic-ui-react";

function App() {
  return (
    <>
      <div className="App-header">
        <Header
          as="h1"
          icon="chart line"
          content="Calculate required rate of return for your goal"
        />
      </div>
      <InputForm />
    </>
  );
}

export default App;
