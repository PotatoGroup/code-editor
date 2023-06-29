# code-editor

a JS code editor based on codeMirror, support code autoCompletion, which can be used with `@astii/expression-sandbox`

## Install

```typeScript
npm install @astii/code-editor --save

or

yarn add @astii/code-editor

```

## Usage

```typeScript
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CodeEditor } from '@astii/code-editor'
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
```
