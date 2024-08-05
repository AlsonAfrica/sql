import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SQLiteComponent from './sql'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SQLiteComponent/>
    
    </>
  )
}

export default App
