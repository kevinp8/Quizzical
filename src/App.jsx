import { useState } from 'react'
import Quiz from './components/Quiz'
import Start from './components/Start'


function App() {
  const [start, setStart] = useState(false)

  function startQuiz() {
    setStart(true)
  }

  return (
    <main>
      {start ? <Quiz/> : <Start startQuiz={startQuiz}/>}
    </main>
  )
}

export default App
