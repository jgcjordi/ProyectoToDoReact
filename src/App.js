import React from 'react';
import './App.css';
import Tareas from './components/Tareas.jsx';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Proyecto "To Do" con React y componentes de terceros</h2>
      </header>
      <Tareas/>
    </div>
  );
}

export default App;
