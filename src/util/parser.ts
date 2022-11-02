import {
  Token,
  Node,
  NumericLiteralToken,
  NumericLiteralNode,
  IdentifierToken,
  CallExpression,
  BinaryExpression,
  AdditiveOperator,
  IdentifierNode
} from "../types/tokens";

type Program = { body: Node[] };

export default function parser(tokens: Token[]): Program {
  const program: Program = { body: [] };

  let current = 0;

  function parse(): Node {
    const token = tokens[current];

    if (token.type === "Identifier") {
      if (tokens[current + 1]?.type === "OpenParenToken")
        return parseCallExpression(token);
      else {
        current++;
        return token;
      }
    }

    if (token.type === "NumericLiteral") {
      const next = tokens[current + 1];

      if (next.type === "PlusToken" || next.type === "MinusToken") {
        return parseBinaryExpression(token, next);
      } else {
        return parseNumericLiteral(token);
      }
    }

    throw new Error(`Unexpected token: ${token.type}`);
  }

  function parseBinaryExpression(
    token: NumericLiteralToken,
    next: AdditiveOperator
  ): BinaryExpression {
    const left = parseNumericLiteral(token);

    const operator = next;
    current++;

    const right = parse();

    return {
      type: "BinaryExpression",
      operator,
      left,
      right
    };
  }

  function parseCallExpression(token: IdentifierToken): CallExpression {
    const identifier = token;
    current++;

    if (tokens[current]?.type !== "OpenParenToken") {
      throw new SyntaxError("Expected '('");
    }
    current++;

    const argument: Node = parse();

    if (tokens[current]?.type !== "CloseParenToken") {
      throw new SyntaxError("Expected ')'");
    }

    current++;

    return {
      type: "CallExpression",
      identifier,
      argument
    };
  }

  function parseNumericLiteral(token: NumericLiteralToken): NumericLiteralNode {
    current++;
    return {
      type: "NumericLiteral",
      value: token.value
    };
  }

  while (current < tokens.length) {
    program.body.push(parse() as Node);
  }

  return program;
}
