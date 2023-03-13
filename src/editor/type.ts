import { Completion } from "@codemirror/autocomplete";

export interface CodeEditorConfig {
  value: string;
  onChange: (value: string) => void;
  completions: Array<AutoCompletion>;
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
