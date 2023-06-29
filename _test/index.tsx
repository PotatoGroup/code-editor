import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CodeEditor } from '../dist/index.min.js'
import completions from './completions'

const App = () => {
    const [value, setValue] = useState('')
    const [_completions, setCompletions] = useState([])
    useEffect(() => {
        setCompletions(completions)
    }, [])

    const onChange = (value) => {
        setValue(value)
    }
    return <CodeEditor value={value} completions={_completions} theme={{
        focused: {
            outline: "1px solid #fa6400",
        }
    }} onChange={onChange} />
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)
