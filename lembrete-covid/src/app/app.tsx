import './App.css';
import InfoLocal from '../info_local/info-local'
import { pedirPermissaoParaReceberNotificacoes } from '../push_notification/push_notification';
import { Button } from 'react-md';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <p> Lembrete Covid</p>
      </div>
      <div className = "centro">
        <InfoLocal />
      </div>
      <div className = "centro botao-notificacao">
        <div className = "branco">
          <Button onClick={pedirPermissaoParaReceberNotificacoes}> Ativar Notificações </Button>
        </div>

      </div>
    </div>
  );
}

export default App;
