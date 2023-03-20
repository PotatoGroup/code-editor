import { EditorView, ViewUpdate } from "@codemirror/view";
import { Annotation } from "@codemirror/state";

const External = Annotation.define<boolean>();
export const UpdateListener = (
  onChange: (value: string, view: ViewUpdate) => void
) => {
  return EditorView.updateListener.of((view: ViewUpdate) => {
    if (
      view.docChanged &&
      typeof onChange === "function" &&
      // Fix echoing of the remote changes:
      // If transaction is market as remote we don't have to call `onChange` handler again
      !view.transactions.some((tr) => tr.annotation(External))
    ) {
      const doc = view.state.doc;
      const value = doc.toString();
      onChange(value, view);
    }
  });
};