import { useState } from 'react'
import { Statistics } from './components';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Statistics />
    </>
  )
}



export default App
