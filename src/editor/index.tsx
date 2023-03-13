import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import {
  CompletionDisplay,
  completionSource,
  EventExt,
  UpdateListener,
} from "./extension";
import { javascript } from "@codemirror/lang-javascript";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { CodeEditorConfig } from "./type";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import styles from "./index.less";

export const CodeEditor = ({
  value,
  onChange,
  completions,
}: CodeEditorConfig) => {
  const containerRef = useRef();
  useEffect(() => {
    const state = EditorState.create({
      doc: value,
      extensions: [
        closeBrackets(),
        EventExt,
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
