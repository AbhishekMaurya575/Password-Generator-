import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState("6");
  const [password, setPassword] = useState("hi");
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);

  const Generatedpassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "1234567890";
    }
    if (characters) {
      str += "!@#$%^&*()-_=+|[]{};:/?.>";
    }
    for (let index = 0; index < length; index++) {
      const Randomindex = Math.floor(Math.random() * str.length);
      pass += str.charAt(Randomindex);
    }
    setPassword(pass);
  } , [number, characters, setPassword, length]); //this is a callback hook//

//  const Generatedpassword =() => {
//     let pass = "";
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//     if (number) {
//       str += "1234567890";
//     }
//     if (characters) {
//       str += "!@#$%^&*()-_=+|[]{};:/?.>";
//     }
//     for (let index = 0; index < length; index++) {
//       const Randomindex = Math.floor(Math.random() * str.length);
//       pass += str.charAt(Randomindex);
//     }
//     setPassword(pass);
//   }  ; //this is without using callback hook

  useEffect(() => {
    Generatedpassword()
  }, [number, characters, setPassword, length]);
  const passwordRef = useRef(null);

  const copypassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.setSelectionRange(0, 20);

    passwordRef.current?.select();
  }, [password]);
  return (
    <>
      <div className="bg-black w-screen h-screen text-white flex justify-center items-center">
        <div className="bg-gray-700 w-[80vw]  sm:w-[50vw]  text-white flex  p-4 rounded-2xl flex-col">
          <div className="font-bold text-4xl text-center">
            Password Generator
          </div>
          <div className=" w-full m-2 flex ">
            <input
              type="text"
              readOnly
              className="text-2xl rounded-l-xl text-orange-600 placeholder-orange-600 outline-none pl-2 w-[91%] p-1 "
              placeholder={password}
              value={password}
              ref={passwordRef}
            />
            <button
              className="bg-blue-600 text-2xl float-right rounded-r-xl  w-[80px] outline-none border-none p-1"
              onClick={copypassword}
            >
              Copy
            </button>
          </div>
          <div className="text-left text-xl md:text-2xl text-orange-600 m-2 sm:flex">
            <div>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="mr-6 ml-1 ">Length:{length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={number}
                onChange={() => setNumber(!number)}
              />
              <label className="mr-6 ml-2">Number</label>
            </div>
            <div>
              {" "}
              <input
                type="checkbox"
                checked={characters}
                onChange={() => setCharacters(!characters)}
              />
              <label className="mr-6 ml-2">Characters</label>
            </div>
          </div>
          <div className="font-bold text-center">
            <button
              className="text-xl bg-red-500  w-[50vw] sm:w-[35vw]  p-1 rounded-2xl text-center flex-wrap m-2 sm:m-0"
              onClick={Generatedpassword}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
