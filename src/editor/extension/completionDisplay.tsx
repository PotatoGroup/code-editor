import React from "react";
import ReactDOM from "react-dom";
import {
  Completion,
  CompletionContext,
  CompletionResult,
  startCompletion,
  closeCompletion,
} from "@codemirror/autocomplete";
import { completionPath } from "@codemirror/lang-javascript";
import { findCompletions, debounce } from "../utils";
import { AutoCompletion, CompletionType } from "../type";
import Info from "../components/Info";
import { EditorView } from "@codemirror/view";

const SpecialChar = [
  "!",
  "@",
  "#",
  "$",
  "^",
  "&",
  "*",
  ",",
  "-",
  "~",
  "\\",
  "'",
];

const renderInfo = (completion) => {
  const { docs: content, type, label: name, detail } = completion;
  const hintDiv = document.createElement("div");
  ReactDOM.render(<Info info={{ content: detail ?? content, type, name }} />, hintDiv)
  // const hintContainer = ReactDOM.createRoot(hintDiv);
  // hintContainer.render(<Info info={{ content, type, name }} />);
  return hintDiv;
};

const defineInfoRenderer = (completions: AutoCompletion[]) => {
  return (completions || [])?.map((completion) => {
    const showInfo = completion.detail || completion.docs;
    return {
      type: CompletionType.variable,
      ...completion,
      info: (completion: Completion) => {
        return showInfo ? renderInfo(completion) : null;
      },
    };
  });
};

const triggerWithSpecialChar = (docInfo, word) => {
  const endChar = Array.from(word.text).pop() as string;
  if (docInfo.name === "" && SpecialChar.includes(endChar)) {
    return true;
  }
  return false;
};

export const completionSource =
  (completions: AutoCompletion[]) =>
  async (context: CompletionContext): Promise<CompletionResult> => {
    const docInfo = completionPath(context);
    console.log(docInfo)
    const word = context.matchBefore(/.*/);
    if (
      !word ||
      !docInfo ||
      (word && word.from == word.to && !context.explicit)
    )
      return null;
    const childCompletions = findCompletions(
      docInfo.name,
      [...docInfo.path],
      completions
    );
    const definedCompletions = defineInfoRenderer(childCompletions);
    let from = context.pos - docInfo.name.length;
    if (triggerWithSpecialChar(docInfo, word)) {
      from--;
    }
    return {
      from,
      options: definedCompletions,
    };
  };

const debouncedStartCompletion: (view: EditorView) => void =
  debounce<EditorView>(function (view: EditorView) {
    startCompletion(view);
  }, 200);

export const CompletionDisplay = () => {
  return EditorView.inputHandler.of((view, from, to, text) => {
    // if (!text.trim()) return false
    closeCompletion(view);
    debouncedStartCompletion(view);
    return false;
  });
};