import { Completion } from "@codemirror/autocomplete";
import { Theme } from "./extension/theme";

export interface CodeEditorConfig {
  placeholder: string,
  value: string;
  theme: Theme;
  completions: Array<AutoCompletion>;
  onChange: (value: string) => void;
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