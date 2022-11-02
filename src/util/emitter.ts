import {
  BinaryExpression,
  Node,
  NumericLiteralNode,
  CallExpression,
  IdentifierNode
} from "../types/tokens";

type Program = { body: Node[] };

export default function emitter(program: Program): string {
  function emit(node: Node): string {
    switch (node.type) {
      case "NumericLiteral":
        return emitNumericLiteral(node);
      case "BinaryExpression":
        return emitBinaryExpression(node);
      case "CallExpression":
        return emitCallExpression(node);
      case "Identifier":
        return emitIdentifier(node);
    }
  }

  function emitIdentifier(node: IdentifierNode): string {
    if (node.value === "globalThis") node.value = "_globalThis";
    return node.value;
  }

  function emitNumericLiteral(node: NumericLiteralNode): string {
    return node.value;
  }

  function emitBinaryExpression(node: BinaryExpression): string {
    return `${emit(node.left)} ${
      node.operator.type === "PlusToken" ? "+" : "-"
    } ${emit(node.right)}`;
  }

  function emitCallExpression(node: CallExpression): string {
    return `${node.identifier.value}(${emit(node.argument)})`;
  }

  const output: string[] = ["const log=console.log;"];
  for (const node of program.body) {
    output.push(emit(node));
  }

  return output.join(";");
}
