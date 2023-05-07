import React from 'react';
import './App.css';
import Sorting from "./components/Sorting";
import DataLegend from "./components/DataLegend";

function App() {
  return (
      <div>
          <div className="flex flex-col items-center justify-center mt-24 text-2xl text-center mx-4 font-bold lg:hidden">
              <span className="text-6xl mb-8">📱🚫</span>
              <span>Ce site n'est pas responsive, </span>
              <span> merci d'utiliser un navigateur plus grand.</span>
          </div>
          <div className="hidden lg:flex flex-col overflow-auto">
              <div className="flex flex-col overflow-auto">
                  <div className="flex justify-center">
                      <h1 className="text-3xl mt-4 mb-8">Sorting algorithms</h1>
                  </div>
                  <div className="fixed top-12 left-12 border-4 border-dashed border-gray-400 bg-gray-100 rounded p-4">
                      <DataLegend/>
                  </div>
                  <div className="flex justify-center mb-4">
                      <Sorting/>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
