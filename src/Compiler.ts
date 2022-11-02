import tokenizer from "./util/tokenizer";
import parser from "./util/parser";
import emitter from "./util/emitter";
import wrapper from "./util/wrapper";

const programs: Map<string, string> = new Map();

export default class Compiler {
  constructor(element: HTMLScriptElement) {
    if (element.type === "application/jpp") {
      if (!element.dataset.jpp_id) {
        element.dataset.jpp_id = programs.size.toString();

        programs.set(programs.size.toString(), element.innerText);

        const tokens = tokenizer(element.innerText);
        const program = parser(tokens);
        const js = emitter(program);
        const wrapped = wrapper(js);

        const script = document.createElement("script");
        script.dataset.jpp_id = element.dataset.jpp_id;
        script.type = "text/javascript";
        script.innerHTML = wrapped;
        element.after(script);
      }
    }
  }
}
