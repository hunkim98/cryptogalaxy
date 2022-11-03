import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Galaxy from "./components/Galaxy";
import { CryptoContextProvider } from "./context/CryptoContext";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "black",
        fontFamily: "Righteous",
      }}
    >
      {/* <header>
        <h1>Crypto Galaxy</h1>
      </header> */}
      <CryptoContextProvider>
        <Galaxy />
      </CryptoContextProvider>
    </div>
  );
}

export default App;
