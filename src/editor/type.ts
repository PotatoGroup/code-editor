import { Completion } from "@codemirror/autocomplete";
import { Events } from "@uiw/codemirror-extensions-events";
import { Theme } from "./extension/theme";
import { ViewUpdate } from "@codemirror/view";

export interface CodeEditorConfig {
  placeholder: string,
  value: string;
  theme: Theme;
  completions: Array<AutoCompletion>;
  onChange: (value: string, view: ViewUpdate) => void;
  events?: Events<keyof HTMLElementEventMap>;
  className: string;
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