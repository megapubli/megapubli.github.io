import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import InputMask from 'react-input-mask';
import './App.css';



function App() {

  const [page, setPage] = useState("home");
  setInterval(() => {
    var caminho = window.location.hash;
    if (caminho == '') {
      setPage('home')
    } else {
      setPage(caminho.replace('#!/', ''))
    }

  }, 500)



  switch (page) {
    case 'home':
      return (<Homescreen />)
      break;
    case 'teste':
      return (<Teste />)
      break;
    default:
      return (<Homescreen />)
      break;
  }


}

class Inputserver extends React.Component {
  render() {
    return <InputMask {...this.props} mask="999.999.9.99" maskChar=" " />;
  }
}
function Teste() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function Homescreen() {
  const [status, setStatus] = useState('primary');
  const [value, setValue] = useState('');
  const [button, setButton] = useState('Conectar ao Servidor');
  return (
    <div className="base">
      <div className="basedois">
        <InputMask mask="999.999.9.9" maskChar=" " id='server' style={{ width: '100%' }} placeholder="192.168.0.1" /><br /><br />
        <button style={{ width: '100%' }} class={'btn btn-lg  btn-' + status} onClick={() => {
          
          setValue(document.getElementById('server').value)
          fetch(`http://${document.getElementById('server').value}:8080/`)
            .then(js => js.json())
            .then((res) => {
              if (res["active_server"] == true) {
                setButton('Conectado com Sucesso')
                setStatus('success')
                setInterval(()=>{
                  
                  window.location.href = "#!/teste";
                }, 1500)
              }
            })
            .catch(err => {
              console.log(JSON.stringify(err))
              setButton('Falha: Tente Novamente')
                setStatus('warning')

            })
          //window.location.href = "#!/teste";
        }}>{button}</button>
        <hr />
        {value}
      </div>

    </div>
  );

}


export default App;
