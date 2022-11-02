import { Token } from "../types/tokens";

export default function tokenize(input: string): Token[] {
  const tokens: Token[] = [];

  let cursorPos = 0;
  while (cursorPos < input.length) {
    let char = input[cursorPos]!;

    // ignore whitespace
    if (/\s/.test(char)) {
      cursorPos++;
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "OpenParenToken" });
      cursorPos++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "CloseParenToken" });
      cursorPos++;
      continue;
    }

    if (char === "+") {
      tokens.push({ type: "PlusToken" });
      cursorPos++;
      continue;
    }

    if (char === "-") {
      tokens.push({ type: "MinusToken" });
      cursorPos++;
      continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++cursorPos]!;
      }

      tokens.push({ type: "NumericLiteral", value });
      continue;
    }

    const LETTERS = /[a-z_$]/i;
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char)) {
        value += char;
        char = input[++cursorPos]!;
      }

      tokens.push({ type: "Identifier", value });
      continue;
    }

    throw new SyntaxError(`Unexpected token: "${char}"`);
  }

  return tokens;
}
