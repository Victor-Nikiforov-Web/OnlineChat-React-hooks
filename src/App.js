import { useState } from 'react';
import './App.css';
import { Chat } from './components/chat/chat';

function App() {
  const [name, setName] = useState();
  const [login, setLogin] = useState(false);
  const [err, setErr] = useState(false);

  const nameValidation = () => {
    if (!name || name.length < 3) {
      setErr(true);
      return;
    }
    setErr(false);
    setLogin(true);
  }

  return (
    <div className="App">
      <h1>Online Chat</h1>
      {!login ?
        <div className='login'>
          <p>Enter nickname :</p>
          {err ?
            <p className='err'>The nickname must contain at least 3 letters</p> : null}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Nickname" onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary" type="button" onClick={nameValidation}>Enter</button>
          </div>
        </div>
        : <Chat name={name} />}
    </div>
  );
}

export default App;
