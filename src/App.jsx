import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [symbolallowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) char += "0123456789";
    if (symbolallowed) char += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      pass += char.charAt(Math.floor(Math.random() * char.length + 1));
    }
    setPassword(pass);
  }, [length, numberallowed, symbolallowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberallowed, symbolallowed]);

  const passwordRef = useRef();
  const handleCopyClick = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };
  return (
    <>
      <div
        className="w-full max-w-md
    mx-auto shadow-md rounded px-4 my-8 bg-black text-white"
      >
        <h1 className="text-3xl text-center font-bold mb-5">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="text-black outline-none w-full py-1 px-3"
            readOnly
            placeholder="Password"
          ></input>
          <button onClick={handleCopyClick} className=" bg-blue-500 p-2 ml-2">
            copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Number</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={symbolallowed}
            onChange={() => {
              setSymbolAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="Symbol">Symbol</label>
        </div>
      </div>
    </>
  );
}

export default App;
