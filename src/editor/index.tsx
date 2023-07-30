import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useMemo, useCallback, Ref } from "react";
import { EditorState, Annotation, EditorSelection, StateEffect } from "@codemirror/state";
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
  defineTheme
} from "./extension";
import { CodeEditorConfig } from "./type";
import styles from "./index.less";

const External = Annotation.define<boolean>();

export type EditorViewRef = {
  getDoc: () => string;
  insertDoc: (text: string) => void;
} | EditorView

const CodeEditor = ({
  value,
  theme,
  completions = [],
  placeholder: placeholderStr = '请输入表达式',
  events,
  className,
  onChange,
}: Partial<CodeEditorConfig>, ref: Ref<EditorViewRef>) => {
  const containerRef = useRef();
  const [view, setView] = useState<EditorView>()

  useImperativeHandle(
    ref,
    () => ({
      ...view,
      getDoc() {
        return view.state.doc.toString()
      },
      insertDoc
    }),
    [view],
  )

  const customTheme = useMemo(() => defineTheme(theme), [theme])

  const placeHolder = useMemo(() => placeholder(placeholderStr), [placeholderStr])

  const autocompletionExtension = useMemo(() => autocompletion({
    activateOnTyping: false,
    override: [completionSource(completions)],
  }), [completions])

  const insertDoc = useCallback((text: string) => {
    const { anchor, head } = view.state.selection.ranges[0]
    view.dispatch({
      changes: { from: head, insert: text || '' },
      selection: EditorSelection.range(anchor, head),
    });
  }, [view])

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
        customTheme,
        placeHolder,
        EventExt(events),
        xcodeLight,
        javascript(),
        autocompletionExtension,
        CompletionDisplay(),
        UpdateListener(onChange),
        EditorView.lineWrapping
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
      insertDoc(value)
    }
  }, [value, view]);

  useEffect(() => {
    if (view) {
      view.state.update({effects: StateEffect.reconfigure.of([autocompletionExtension]) })
    }
  }, [
    placeHolder,
    customTheme,
    autocompletionExtension
  ]);

  return <div className={`${styles.container} ${className}`} ref={containerRef} />;
};



export default forwardRef<EditorViewRef, Partial<CodeEditorConfig>>(CodeEditor)
