import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useMemo } from "react";
import { EditorState, Annotation, StateEffect } from "@codemirror/state";
import { EditorView, placeholder } from "@codemirror/view";
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
  placeholder: placeholderStr = '请输入表达式',
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

  const _customTheme = useMemo(() => customTheme(theme), [theme])

  const autoCompletion = useMemo(() => autocompletion({
    activateOnTyping: false,
    override: [completionSource(completions)],
  }), [completions])

  const placeHolder = useMemo(() => placeholder(placeholderStr), [placeholderStr])

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
        _customTheme,
        placeHolder,
        EventExt(),
        xcodeLight,
        javascript(),
        autoCompletion,
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

  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of([placeHolder, _customTheme, autoCompletion]) });
    }
  }, [
    placeHolder,
    _customTheme,
    autoCompletion,
  ]);

  return <div className={styles.container} ref={containerRef} />;
};



export default forwardRef<any, Partial<CodeEditorConfig>>(CodeEditor)
