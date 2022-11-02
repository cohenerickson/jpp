export type IdentifierToken = { type: "Identifier"; value: string };
export type OpenParenToken = { type: "OpenParenToken" };
export type CloseParenToken = { type: "CloseParenToken" };
export type NumericLiteralToken = { type: "NumericLiteral"; value: string };
export type PlusToken = { type: "PlusToken" };
export type MinusToken = { type: "MinusToken" };

export type Token =
  | IdentifierToken
  | OpenParenToken
  | CloseParenToken
  | NumericLiteralToken
  | PlusToken
  | MinusToken;

export type AdditiveOperator = PlusToken | MinusToken;

export type IdentifierNode = IdentifierToken;
export type NumericLiteralNode = { type: "NumericLiteral"; value: string };
export type CallExpression = {
  type: "CallExpression";
  identifier: IdentifierToken;
  argument: Node;
};
export type BinaryExpression = {
  type: "BinaryExpression";
  operator: AdditiveOperator;
  left: Node;
  right: Node;
};

export type Node =
  | NumericLiteralNode
  | CallExpression
  | BinaryExpression
  | IdentifierNode;
