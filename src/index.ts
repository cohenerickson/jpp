import Compiler from "./Compiler";

document.querySelectorAll("script").forEach((element) => {
  new Compiler(element);
});
