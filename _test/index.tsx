import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CodeEditor } from '../src'
import completions from './completions'

const App = () => {
    const [value, setValue] = useState('')
    const [_completions, setCompletions] = useState([])
    useEffect(() => {
        setCompletions(completions)
    }, [])
    return <CodeEditor value={value} completions={_completions} onChange={(value) => setValue(value)} />
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)
