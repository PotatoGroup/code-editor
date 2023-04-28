type Code = string | undefined;
type Context = Record<string, any> | undefined;

export default class Sandbox {
  private context: Context;
  constructor(context: Context) {
    this.context = context;
  }
  private unscopeCompileCode(code: Code) {
    return new Function(
      "context",
      `with(context){
            return ${code}
        }`
    );
  }
  private scopeCompileCode(code: Code) {
    const fn = this.unscopeCompileCode(code);
    return (sandbox) => {
      const proxy = new Proxy(sandbox, {
        // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找
        has(target, key) {
          return true;
        },
        get(target, key, receiver) {
          // 防止沙箱逃逸逃逸
          if (key === Symbol.unscopables) {
            return undefined;
          }
          return Reflect.get(target, key, receiver);
        },
      });
      return fn(proxy);
    };
  }
  execute(code: Code) {
    const fn = this.scopeCompileCode(code);
    return fn.call(this, this.context);
  }
}
