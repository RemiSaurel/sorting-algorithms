import React from 'react';
import './App.css';
import Sorting from "./components/Sorting";

function App() {
  return (
      <div className="text-center">
          <h1 className="text-4xl my-12">Sorting algorithms</h1>
          <div className="flex justify-center">
              <Sorting
                  nbItems={10}
              />
          </div>
      </div>
  );
}

export default App;
