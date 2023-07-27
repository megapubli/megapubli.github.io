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
    case 'scan':
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
  document.addEventListener("DOMContentLoaded", function () {


    // Configuração do QuaggaJS
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          facingMode: "environment" // Use "user" para câmera frontal
        },
      },
      decoder: {
        readers: ["ean_reader"] // Leitor para códigos de barras EAN
      },
    }, function (err) {
      if (err) {
        console.error("Erro ao iniciar o Quagga:", err);
        return;
      }
      console.log("Quagga iniciado com sucesso!");
      Quagga.start();
    });

    // Evento para quando um código é detectado
    Quagga.onDetected(function (result) {
      console.log("Código de barras detectado:", result.codeResult.code);
      // Você pode fazer o que quiser com o resultado aqui, por exemplo, armazená-lo em uma base de dados.
    });
  });
  return (
    <div className="App">
    <div id="interactive" style={{width: 640, height: 480}}></div>
    </div>
  );
}
function Homescreen() {
  const [status, setStatus] = useState('primary');
  const [value, setValue] = useState('');
  const [button, setButton] = useState('Conectar ao Servidor');

  function setUser(res, callback) {
    window.localStorage.setItem('User', res);
    callback(true);
  }
  return (
    <div className="base">
      <div className="basedois">
        <input type='number' id='server' style={{ width: '100%' }} placeholder="Digite o Numero solicitado" />

        <br /><br />
        <button style={{ width: '100%' }} class={'btn btn-lg  btn-' + status} onClick={() => {

          setValue(document.getElementById('server').value)

          setUser(document.getElementById('server').value, (res) => {


            setButton('Conectado com Sucesso')
            setStatus('success')
            setInterval(() => {

              window.location.href = "#!/scan";
            }, 1500)

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
