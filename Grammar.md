# Cheddar Grammar

Using WSN

## Expression

Expression Definitions:

    TypedLiteral = TOKEN ':' (PARENTHESIZED_EXPRESSION | PROPERTY | LITERAL)
                 | LITERAL .
    Operator     = TOKEN | OPERATOR .
    Expression   = Expression Operator Expression |
                 | Operator Expression
                 | Expression Operator
                 | '(' Expression ')'
                 | PROPERTY
                 | TypedLiteral .

Class Names:

    TOKEN : CheddarLiteralToken
    LITERAL : CheddarAnyLiteral
    OPERATOR : CheddarOperatorToken
    PROPERTY : CheddarProperty
    PARENTHESIZED_EXPRESSION : CheddarParenthesizedExpression

## Code Block

Todo...

## Command Parser
    Command = TOKEN { Expression } .

## Function Parser

Function Definitions:

    FunctionOpen = "->" | "=>"
    
    FunctionBody = FunctionOpen (
                  '{' CodeBlock '}'
                 | Command
                 | Expression  ) .
             
