import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed]  = useState(false)
  const [password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*()_+-={}|[]:;<>?,./"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass+= str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    //   passwordRef.current?.setSelectionRange(0,4) 
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-fuchsia-200'>
        <h1 className='text-white text-center my-3 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-5 py-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3 rounded-lg'
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button 
          className='outline-none bg-cyan-500 rounded-lg text-white ml-2 px-3 py-3'
          onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 pb-8'>
          <div className='flex items-center gap-x-1'>
          <input type='range'
          min = {6}
          max = {100}
          value = {length}  
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type = "checkbox"
            defaultChecked= {numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type = "checkbox"
            defaultChecked= {characterAllowed}
            id="characterInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
            />
            <label>characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
