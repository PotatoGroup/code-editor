import { Completion } from "@codemirror/autocomplete";
import { Events } from "@uiw/codemirror-extensions-events";
import { Theme } from "./extension/theme";
import { ViewUpdate } from "@codemirror/view";

export interface BasicSetOptions {
  lineNumbers?: boolean;
  highlightActiveLineGutter?: boolean;
  foldGutter?: boolean;
  dropCursor?: boolean;
  allowMultipleSelections?: boolean;
  indentOnInput?: boolean;
  bracketMatching?: boolean;
  closeBrackets?: boolean;
  autocompletion?: boolean;
  rectangularSelection?: boolean;
  crosshairCursor?: boolean;
  highlightActiveLine?: boolean;
  highlightSelectionMatches?: boolean;
  closeBracketsKeymap?: boolean;
  searchKeymap?: boolean;
  foldKeymap?: boolean;
  completionKeymap?: boolean;
  lintKeymap?: boolean;
  /**
   * Facet for overriding the unit by which indentation happens. Should be a string consisting either entirely of spaces or entirely of tabs. When not set, this defaults to 2 spaces
   * https://codemirror.net/docs/ref/#language.indentUnit
   * @default 2
   */
  tabSize?: number;
  highlightSpecialChars?: boolean;
  history?: boolean;
  drawSelection?: boolean;
  syntaxHighlighting?: boolean;
  defaultKeymap?: boolean;
  historyKeymap?: boolean;
  readonly?: boolean;
}

export interface CodeEditorConfig {
  placeholder: string;
  value: string;
  theme: Theme;
  completions: Array<AutoCompletion>;
  onChange: (value: string, view: ViewUpdate) => void;
  events?: Events<keyof HTMLElementEventMap>;
  className: string;
  options?: BasicSetOptions;
}

export enum CompletionType {
  class = "class",
  constant = "constant",
  enum = "enum",
  function = "function",
  interface = "interface",
  keyword = "keyword",
  method = "method",
  namespace = "namespace",
  property = "property",
  text = "text",
  type = "type",
  variable = "variable",
}

export type AutoCompletion = Completion & {
  docs: string;
  properties: AutoCompletion[];
};
