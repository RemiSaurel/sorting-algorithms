import React from 'react';
import Sorting from "./components/Sorting";
import DataLegend from "./components/DataLegend";
import MiscInfos from "./components/MiscInfos";

function App() {
  return (
        <div>
          <div className="flex justify-center">
              <h1 className="text-3xl mt-4 mb-6">Tri visualizer</h1>
          </div>
            <div className="hidden lg:flex absolute w-52 justify-start text-xl text-gray-700 top-4 left-12">
                Légende
            </div>
          <div className="hidden lg:flex absolute w-52 justify-end text-xl text-blue-900 top-4 right-12 text-end">
              Infos
          </div>
          <div className="flex justify-center mb-4 gap-4">
              <div className="flex w-52 justify-center lg:absolute top-12 left-12 border-4 border-dashed border-gray-400 bg-gray-100 rounded p-4">
                  <DataLegend/>
              </div>
              <div className="flex w-52 justify-center lg:absolute top-12 right-12 border-4 border-dashed border-blue-900 bg-gray-100 rounded p-2">
                  <MiscInfos/>
              </div>
          </div>
          <div className="flex justify-center mb-4 h-screen w-screen">
              <Sorting/>
          </div>
        </div>
  );
}

export default App;
