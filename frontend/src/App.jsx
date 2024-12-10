import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='content'>
      <h1 className='lift'>Lift Site</h1>
    </div>
  )
}

export default App
