import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
// import { CodeEditor } from '../dist/index.min.js'
import { CodeEditor } from '../src/index'
import completions from './completions'
import styles from './index.less'

const App = () => {
    const [value, setValue] = useState('')
    const [_completions, setCompletions] = useState([])
    useEffect(() => {
        setCompletions(completions)
    }, [])

    const onChange = (value) => {
        setValue(value)
    }

    return <CodeEditor className={styles.wrap} value={value} completions={_completions} onChange={onChange} />
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)
