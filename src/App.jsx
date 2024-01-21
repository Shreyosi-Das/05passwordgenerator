import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState("8");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}~`|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword]);
  useEffect(()=>{
    passwordGenerator()
  },[length,characterAllowed,numberAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>

      <div className="outer-div max-w-md w-full shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-4 ">Password generator</h1>
        <div className='flex shadow rounded-lg mb-4 bg-green-400'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='bg-blue-500 text-white px-3 py-0.5 shrink-0 outline-none'>Copy</button>

        </div>
        <div className='flex gap-1 shadow rounded-lg overflow-hidden mb-4'>
          <div className=' text-center flex items-center'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }
                }
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id='characterInput'
                onChange={() => {
                  setCharacterAllowed((prev) => !prev)
                }
                }
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}



export default App
