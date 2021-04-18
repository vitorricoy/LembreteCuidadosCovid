import './App.css';
import InfoLocal from '../info_local/InfoLocal'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p> Lembrete Covid</p>
      </div>
      <div className = "Local">
        <InfoLocal />
      </div>
    </div>
  );
}

export default App;
