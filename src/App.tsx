import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Galaxy from "./components/Galaxy";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <header>
        <h1>Crypto Galaxy</h1>
      </header> */}
      <Galaxy />
    </div>
  );
}

export default App;
