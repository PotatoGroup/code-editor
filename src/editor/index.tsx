import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { EditorState, Annotation } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { autocompletion } from "@codemirror/autocomplete";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import {
  CompletionDisplay,
  completionSource,
  EventExt,
  UpdateListener,
  customTheme
} from "./extension";
import { CodeEditorConfig } from "./type";
import styles from "./index.less";

const External = Annotation.define<boolean>();

const CodeEditor = ({
  value,
  theme,
  completions = [],
  onChange,
}: Partial<CodeEditorConfig>, ref: any) => {
  const containerRef = useRef();
  const [view, setView] = useState<EditorView>()

  useImperativeHandle(
    ref,
    () => ({
      view,
    }),
    [view],
  )
  useEffect(() => {
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup({
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          bracketMatching: true,
          closeBrackets: true,
          closeBracketsKeymap: true,
          tabSize: 2,
          autocompletion: true,
          searchKeymap: false,
          syntaxHighlighting: true,
        }),
        customTheme(theme),
        EventExt(),
        xcodeLight,
        javascript(),
        autocompletion({
          activateOnTyping: false,
          override: [completionSource(completions)],
        }),
        CompletionDisplay(),
        UpdateListener(onChange),
      ],
    });
    const view = new EditorView({
      parent: containerRef.current,
      state,
    });
    setView(view)
    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    const currentValue = view ? view.state.doc.toString() : '';
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || '' },
        annotations: [External.of(true)],
      });
    }
  }, [value, view]);

  return <div className={styles.container} ref={containerRef} />;
};



export default forwardRef<any, Partial<CodeEditorConfig>>(CodeEditor)
