import React, { useState, useEffect } from 'react'

function Quiz() {

    const [qs, setqs] = useState([])
    const [clickable, setClickable] = useState(true)
    const [correct, setCorrect] = useState(0)
    const [playAgain, setPlayAgain] = useState(false)

    useEffect(() => {
        async function getQs() {
            try {
                const data = await fetch('https://opentdb.com/api.php?amount=5')
                const qs = await data.json()
                const qArr = qs.results.map(q => ({
                    question: q.question,
                    correct: q.correct_answer,
                    options: [...q.incorrect_answers, q.correct_answer].sort().map(i  => ({
                        choice: i,
                        color: '#F5F7FB',
                        clickable: true
                    }))
                }))
                setqs(qArr)
            } catch (err) {console.log(err)}
        }
        getQs()
    }, [playAgain])

    function choseOption(ques, ans){
        setqs(prev => {
            let e = [...prev]
            for (let i=0; i<e[ques].options.length; i++) {
                if (i === ans) e[ques].options[ans].color = '#D6DBF5'
                else e[ques].options[i].color = '#F5F7FB'
            }
            return e
        })
    }

    function check(){
        setClickable(false)
        setqs(prev => {
            let e = [...prev]
            for (let i=0; i<e.length; i++) {
                for (let j=0; j<e[i].options.length; j++) {
                    if (e[i].options[j].color === '#D6DBF5') {
                        if (e[i].options[j].choice !== e[i].correct) e[i].options[j].color = '#F8BCBC'
                        else {
                            e[i].options[j].color = '#94D7A2'
                            setCorrect(prev => prev+1)
                        }
                    } else if (e[i].options[j].choice === e[i].correct) e[i].options[j].color = '#94D7A2'
                }
            }
            return e
        })
    }

  return (
    <div className='quiz'>
        {qs.map((q, qIndex) => (
            <div className='qBlock' key={qIndex}>
                <h2>{q.question}</h2>
                {q.options.sort().map((option, oIndex) => (
                    <button 
                    className='options'
                    style={{backgroundColor: option.color}}
                    key={oIndex}
                    onClick={() => clickable ? choseOption(qIndex, oIndex) : null}
                    >
                        {option.choice}
                    </button>
                ))}
            </div>
        ))}

        {!clickable && <p>You scored {correct}/5 correct answers </p>}
        {clickable ? <button className='check' onClick={check}>Check answers</button> : (
            <button 
            className='check'
            onClick={() => {
                setClickable(true)
                setPlayAgain(!playAgain)
                setCorrect(0)}}
            >
                Play again
            </button>)}
    </div>
  )
}

export default Quiz