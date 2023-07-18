import React, { useEffect, useReducer, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
// import { CodeEditor } from '../dist/index.min.js'
import { CodeEditor } from '../src/index'
import completions from './completions'
import styles from './index.less'

const App = () => {
    const [value, setValue] = useState('')
    const [_completions, setCompletions] = useState([])
    const editorRef = useRef()
    useEffect(() => {
        setCompletions(completions)
    }, [])

    const onChange = (value) => {
        setValue(value)
    }

    const onClick = () => {
        const text = 'sfsfsfs';
        editorRef.current.insertDoc(text)
    }


    return <div>
        <CodeEditor ref={editorRef} className={styles.wrap} value={value} completions={[]} onChange={onChange} />
        <button type="button" onClick={onClick}>insert</button>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)
