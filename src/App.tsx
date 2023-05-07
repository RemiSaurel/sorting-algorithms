import React from 'react';
import Sorting from "./components/Sorting";
import DataLegend from "./components/DataLegend";

function App() {
  return (
        <div>
          <div className="flex justify-center">
              <h1 className="text-3xl mt-4 mb-6">Sorting algorithms</h1>
          </div>
          <div className="flex justify-center mb-4">
              <div className="flex w-52 justify-center lg:fixed top-12 left-12 border-4 border-dashed border-gray-400 bg-gray-100 rounded p-4">
                  <DataLegend/>
              </div>
          </div>
          <div className="flex justify-center mb-4 h-screen w-screen">
              <Sorting/>
          </div>
        </div>
  );
}

export default App;
