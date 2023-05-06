import React, {useState} from 'react';
import './App.css';
import Sorting from "./components/Sorting";

function App() {
  return (
      <div className="flex flex-col mx-44">
          <div className="flex justify-center">
              <h1 className="text-3xl mt-4 mb-8">Sorting algorithms</h1>
          </div>
          <div className="flex justify-center">
              <Sorting/>
          </div>
      </div>
  );
}

export default App;
