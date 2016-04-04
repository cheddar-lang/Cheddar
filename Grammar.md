# Cheddar Grammar

Using WSN

## Expression

Expression Definitions:

    TypedLiteral = TOKEN ':' (PARENTHESIZED_EXPRESSION | PROPERTY | LITERAL)
                 | LITERAL .
    Operator     = TOKEN | OPERATOR .
    
Expression Grammar

    Expression   = Expression Operator Expression |
                 | Operator Expression
                 | Expression Operator
                 | '(' Expression ')'
                 | PROPERTY
                 | TypedLiteral .

This is left recursive so we can refactor to:

    E -> O E α
         ( E ) α
         P α
         L α
    α -> O E α
         O α
         ε

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
             
