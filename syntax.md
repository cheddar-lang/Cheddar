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
