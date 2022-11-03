import React, { useRef } from "react";
import logo from "assets/logo.png";
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
      <div style={{ position: "absolute", width: 200, left: 20, top: 30 }}>
        <img src={logo} style={{ width: "100%", height: "auto" }} alt="logo" />
      </div>
      <CryptoContextProvider>
        <Galaxy />
      </CryptoContextProvider>
    </div>
  );
}

export default App;
