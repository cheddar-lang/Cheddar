<p align="center">
  <a href="https://github.com/vihanb/Cheddar">
    <img src="https://raw.githubusercontent.com/vihanb/Cheddar/master/misc/logo_wide.png" alt="Cheddar" width="846">
  </a>
</p>

<p align="center">
  A powerful, object-oriented, functional, high-level programming language.
</p>

<p align="center">
  <a href="https://travis-ci.org/vihanb/Cheddar"><img alt="Travis Status" src="https://travis-ci.org/vihanb/Cheddar.svg?branch=master"></a>
</p>

It is currenty in development, to give an approximate idea of how much work has been done, an expression parser is almost finished.

Contributors:

 - @vihanb
 - @somebody
 - @CᴏɴᴏʀO'Bʀɪᴇɴ

## Roadmap

**The formal grammar is written: [here](https://github.com/vihanb/Cheddar/blob/master/Grammar.md)**

 - [x] Define streams
 - [x] Define class structure
 - [x] Define basic runtime enviorment
 - [x] Token linking
 - [x] Call stack handling
 - [x] Define namespaces
 - [x] Handle lookups
 - [x] Define primitive classes
  - [x] String
  - [x] Number
  - [x] Array
  - [x] Boolean
  - [ ] Undefined
 - [ ] Expression evaluation integration
  - [x] Linking
  - [x] Call stack configuration
  - [ ] Scope linking
  - [ ] Explicit Casting
  - [ ] Constructing
 - [ ] Conditional expression handling
 - [ ] Loop expression handling
 - [ ] Functions
  - [ ] Syntax definition
  - [x] Functional design
  - [x] Function scope
  - [ ] Function handling
  - [ ] Function lookup
  - [ ] Function execution
  - [ ] Token linking
 - [ ] Class handling
  - [x] Syntax definition
  - [x] Class design, and implementation
  - [x] Class scoping
  - [x] Class lookup
  - [x] Class Execution
  - [ ] Token linking
 - [ ] I/O Interfacing
 - [ ] Statement handling
 - [ ] Interpretation
 - [ ] Call stack optimization
 - [ ] Congrats! Cheddar is done!

Critical Running Bugs:

 - [x] Fix infinite precedence with unary operators bug
 - [ ] Precendence ignored

Bugs:

 - [ ] Stack overflowing during various invalid expression syntax
 - [ ] Error handling is completely borked.

Further Development

 - [ ] JS Interfacing
 - [ ] A bunch of libraries


## Milestones

A list of milestones in Cheddar's development:

 - Scoping works (half of a huge milestone)
```js
Cheddar:T_REPL> set B 123   // B = 123
Cheddar:T_REPL> get B       // print B     // Outputs: 123
123                         //
Cheddar:T_REPL> scope      // {
Cheddar:T_REPL> set C 000   //     C = 000
Cheddar:T_REPL> get C       //     print C // Outputs: 000
000                         //
Cheddar:T_REPL> get B       //     print B // Outputs: 123
123                         //
Cheddar:T_REPL> set B 456   //     B = 456
Cheddar:T_REPL> exit        // }
Cheddar:T_REPL> get B       // print B     // Outputs: 456
456                         //
Cheddar:T_REPL> get C       // print C     // Outputs: KEY_NOT_FOUND
Symbol(KEY_NOT_FOUND)       //
```
 - Expression parsing works (a huge milestone)
```js
CheddarExpressionToken {
  Index: 8,
  _Tokens:
   [ CheddarArrayToken {
       Index: 8,
       _Tokens:
        [ CheddarExpressionToken {
            Index: 5,
            _Tokens:
             [ CheddarNumberToken { Index: 2, _Tokens: [ 10, 0, '0' ] },
               CheddarExpressionTokenAlpha {
                 Index: 5,
                 _Tokens:
                  [ CheddarOperatorToken { Index: 4, _Tokens: [ '+' ] },
                    CheddarExpressionToken {
                      Index: 5,
                      _Tokens: [ CheddarNumberToken { Index: 5, _Tokens: [ 10, 0, '1' ] } ] } ] } ] },
          CheddarExpressionToken {
            Index: 7,
            _Tokens: [ CheddarNumberToken { Index: 7, _Tokens: [ 10, 0, '2' ] } ] } ] } ] }

```
 - Property parsing works (for input `foo.bar("foo", 1234)`)
```js
CheddarExpressionToken {
  Index: 20,
  _Tokens:
   [ CheddarPropertyToken {
       Index: 20,
       _Tokens:
        [ CheddarVariableToken { Index: 4, _Tokens: [ 'foo' ] },
          CheddarVariableToken { Index: 8, _Tokens: [ 'bar' ] },
          CheddarTokens {
            '0':
             CheddarAnyLiteral {
               Index: 13,
               _Tokens: [ CheddarStringToken { Index: 13, _Tokens: [ 'foo' ] } ] },
            '1':
             CheddarAnyLiteral {
               Index: 19,
               _Tokens: [ CheddarNumberToken { Index: 19, _Tokens: [ 10, 0, '1234' ] } ] },
            length: 2 } ],
       Type: Symbol(Method) } ] }
```

## Example Programs

To get an idea of how the syntax is going to look, here are examples:

```groovy
class Animal(String: Name, Int: Age) {
   /* variable initialization is implicit
    *  but you can explicitly declare a
    * main {} block to initialize your variables
    */

   speak => "Hello, my name is #{self.Name}, I am #{self.Age} years old"
}


class Dog(String: Name, Int:Age, String:Breed) extends Animal {
    /* super is implicit, but you can
     * explicitly call super using:
     */
    super Name, Age

    speak => "Woof! I am a #{self.Breed} dog, I am #{self.Age} years old and am called #{self.Name}"
}
```

# Details

**The following is detailed description on the functionality and implementation of Cheddar, you probably can save yourself some scrolling, by not reading it**

### Class Notes

The Cheddar Class is a critical component in Cheddar execution. All literals either are constructed upon an internal or external classes.
The class layer provides a custom set of all functions to provide a distinct level of abstraction throughout the interpreter

### Info
The classes implementation is designed to provide a significant level of abstraction as stated before
Various parts to interface with operators and scopes are added through seperate classes.

### Proccess
A classes construction is illustration in thefollowing diagram:
```
               Class
    ____________|______________
    |           |             |
  args        main()       instance
           _____|________
           |    |       |
        scope main()  return
```
Within the constructor. The class stores an internal scope as itself is an extention of CheddarScope. Built-ins are merged through `main()` whether implicit or explicit.

Define operators. Each item in the hash-map, defines behavior for the specific token in an `OperatorToken` `Operators:HashMap<Token, Behavior(LHS, RHS)>` Unary operators will RHS explicitly be an unabstrated, native, `null` value which will require an interface in order for a Cheddar unary operator interface


### Syntax

Comments:

```scala
# This is a comment
// So is this
/*
 * Multiline comment
 */
```

Functions:

```scala
// Anonymous function, No arguments
=> 2 + 2
// Anonymous function, specified arguments
-> (a, b) a + b

// Named functions
foo => 2 + 2
bar -> (a, b) a + b

foo() // 4
bar(2, 2) // 4
```

Constructing Classes / Explicit Typed literals
```groovy
MyClass:(2,2) // Inits "MyClass" with arguments 2 and 2
String:3      // Makes string with value of '3' (functions like a cast)
Number:"32"   // Makes "32" into a number (functions like a case)
```

Literals:
```c++
1234  // number
12.34 // decimal
0x123 // hexadecimal literal
0b101 // binary literal

"double quoted string"
'single quoted string'

["this", 'is', [String:"an", 'array', 4+4]] // array
```

Expressions:

```scala
sqrt 4 // unary operators
4 + 4  // infix operators
a := 4 // assigment
```

condition-blocks:

```groovy
if true foo() // runs foo if `true` evalutes to true
if (true) foo()
if true {
    foo()
}
if (true) {
    foo()
}
```


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

```
-> (arg1, arg2) {
  // code block
}

-> (arg1, arg2) /* expression */

=> (arg1, arg2) {
  // code block
}

=> (arg1, arg2) /* expression */

~> /* expression */
```

this can parse the first to parts:

```
this.grammar(true,
  [['->', '=>'], [CheddarArrayToken.makeparser('(', ')'), CheddarVariableToken], /*parse code block or expression somehow*/],
  ['~>', CheddarExpressionToken]
)
```
