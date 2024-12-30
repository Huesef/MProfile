import { useState } from 'react'
import Login from './Login'
import Register from './Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register></Register>
    </>
  )
}

export default App
