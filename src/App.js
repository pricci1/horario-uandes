import React from "react";
import "./styles.css";

import Dropzone from "./components/filedrop";

export default function App() {
  return (
    <div className="App">
      <h1>Horario Ingeniería</h1>
      <Dropzone text="Arrastrea un XLSX..." />
    </div>
  );
}
