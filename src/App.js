import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import './App.css';



function App() {

  const [page, setPage] = useState("home");
  setInterval(() => {
    var caminho = window.location.hash;
    setPage(caminho.replace('#!/', ''))
  }, 500)
  window.location.href = "#!/home"
  return (<div>
    {page == 'home' ? (<Homescreen />) : null}
    {page == 'teste' ? (<Teste />) : null}
  </div>
  )

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
  const[ status, setStatus] = useState('primary')
  return (
    <div className="base">
      <div className="basedois">
        <Inputserver id='server' style={{ width:'100%'}} placeholder="192.168.0.1"/><br/><br/>
        <button style={{ width:'100%'}} class={'btn btn-lg  btn-'+status} onClick={() => {
          setInterval(()=>{ setStatus('success')
        
          setInterval(()=>{window.location.href = "#!/teste"}, 1000)
        }, 2000)
          //window.location.href = "#!/teste";
        }}> teste</button>
      </div>

    </div>
  );

}


export default App;
