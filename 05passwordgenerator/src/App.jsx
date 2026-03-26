import { useCallback, useState, useEffect, useRef } from "react"

function App() {
  const [length,setLength] = useState(0)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [upperCaseAllowed,setUpperCaseAllowed] = useState(false)
  const [lowerCaseAllowed,setLowerCaseAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ''
    let str = ''
    if(numberAllowed){
      str += '0123456789'
    }
    if(charAllowed){
      str += '!@#$%^&*()'
    }
    if(upperCaseAllowed){
      str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if(lowerCaseAllowed){
      str += 'abcdefghijklmnopqrstuvwxyz'
    }
    for(let i = 1;i<=length;i++){
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)
  },[
    length,
    numberAllowed,
    upperCaseAllowed,
    lowerCaseAllowed,
    charAllowed
  ])

  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,upperCaseAllowed,lowerCaseAllowed,charAllowed])


  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
        value={password} 
        className="bg-white outline-none w-full py-1 px-3"
        placeholder="Password" 
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPassword}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div
      className="flex text-sm gap-3 justify-center">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={20}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
          /> 
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={(e)=>setNumberAllowed((prev)=>!prev)}
          /> 
          <label htmlFor="Number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={(e)=>setCharAllowed((prev)=>!prev)}
          /> 
          <label htmlFor="characters">Characters</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={upperCaseAllowed}
          onChange={(e)=>setUpperCaseAllowed((prev)=>!prev)}
          /> 
          <label htmlFor="upper">Upper</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={lowerCaseAllowed}
          onChange={(e)=>setLowerCaseAllowed((prev)=>!prev)}
          /> 
          <label htmlFor="lower">Lower</label>
        </div>
      </div>
    </div>
  )
}

export default App
