import React from 'react';
import Sorting from "./components/Sorting";
import DataLegend from "./components/DataLegend";

function App() {
  return (
        <div>
          <div className="flex justify-center">
              <h1 className="text-3xl mt-4 mb-6">Sorting algorithms</h1>
          </div>
          <div className="fixed top-12 left-12 border-4 border-dashed border-gray-400 bg-gray-100 rounded p-4">
              <DataLegend/>
          </div>
          <div className="flex justify-center mb-4 h-screen w-screen overflow-auto">
              <Sorting/>
          </div>
        </div>
  );
}

export default App;
