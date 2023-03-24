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

const renderInfo = (completion) => {
  const { docs: content, type, label: name } = completion;
  const hintDiv = document.createElement("div");
  ReactDOM.render(<Info info={{ content, type, name }} />, hintDiv)
  // const hintContainer = ReactDOM.createRoot(hintDiv);
  // hintContainer.render(<Info info={{ content, type, name }} />);
  return hintDiv;
};

const defineInfoRenderer = (completions: AutoCompletion[]) => {
  return (completions || [])?.map((completion) => {
    return {
      type: CompletionType.variable,
      ...completion,
      info: (completion: Completion) => {
        return renderInfo(completion);
      },
    };
  });
};

const triggerWithSpecialChar = (docInfo, word) => {
  const specialChar = ['!', '@', '#', '$', '^', '&', '*', ',', '-', '~', '\\']
  const endChar = Array.from(word.text).pop() as string
  if (docInfo.name === '' && specialChar.includes(endChar)) {
    return true
  }
  return false
}

export const completionSource = (completions: AutoCompletion[]) => async (
  context: CompletionContext
): Promise<CompletionResult> => {
  const docInfo = completionPath(context);
  const word = context.matchBefore(/.*/);
  let definedCompletions = [];
  if (docInfo) {
    const childCompletions = findCompletions(
      docInfo.name,
      [...docInfo.path],
      completions
    );
    definedCompletions = defineInfoRenderer(childCompletions);
  }
  if (!word) return null;
  if (word && word.from == word.to && !context.explicit) {
    return null;
  }

  let from = context.pos - docInfo.name.length;
  if(triggerWithSpecialChar(docInfo, word)){
    from--;
  }
  return {
    from,
    options: definedCompletions
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