import { CSSProperties } from "react";
import { EditorView } from "@codemirror/view";

export type Theme = Partial<Record<keyof typeof ThemeKey, CSSProperties>>;

enum ThemeKey {
  root = "&",
  focused = "&.cm-editor.cm-focused",
  matchingBracket = "&.ͼ1 .cm-matchingBracket, &.ͼ1.cm-focused .cm-matchingBracket",
}

export const defineTheme = (theme: Theme = {}) => {
  const defaultTheme = {
    "&": {
      backgroundColor: "inherit !important",
      height: "100%",
      width: "100%",
    },
    "&.cm-editor.cm-focused": {
      outline: "1px solid #4096ff",
    },
    "&.ͼ1 .cm-matchingBracket, &.ͼ1.cm-focused .cm-matchingBracket": {
      color: "#40A072",
      backgroundColor: "#fff",
    },
  };
  for (const [key, value] of Object.entries(theme)) {
    defaultTheme[ThemeKey[key]] = value;
  }
  return EditorView.baseTheme(defaultTheme);
};
