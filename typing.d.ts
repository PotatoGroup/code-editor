declare module "*.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare enum CompletionType {
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
