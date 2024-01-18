import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [NumAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (NumAllowed) str += "01234567899876543210";
    if (charAllowed) str += "!@#$%^&*(){}-=_+~:?></.,:;";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(pass);
  }, [length, charAllowed, NumAllowed, setPassword]);

  useEffect(() => {

    passwordGenerator();

  }, [NumAllowed, charAllowed, length, passwordGenerator])

  const copyPassword = ()=>{
    passwordRef.current?.select();
    passwordRef.current.style.color="blue";
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button onClick={copyPassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            value={length}

          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={NumAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}

          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={charAllowed}
            onChange={(prev) => setCharAllowed((prev) => !prev)}

          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
