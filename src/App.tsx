import React from 'react';
import './App.css';
import ElementGrid from "./components/ElementGrid";

function App() {
  return (
      <div>
          <h1>Sorting algorithms</h1>
        <ElementGrid
            nbItems={10}
        />
      </div>
  );
}

export default App;
