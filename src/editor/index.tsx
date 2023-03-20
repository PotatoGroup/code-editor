import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
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

export const CodeEditor = ({
  value,
  theme,
  completions = [],
  onChange,
}: Partial<CodeEditorConfig>) => {
  const containerRef = useRef();
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
    return () => {
      view.destroy();
    };
  }, [value]);
  return <div className={styles.container} ref={containerRef} />;
};
