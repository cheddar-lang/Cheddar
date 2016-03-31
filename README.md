# Cheddar

Cheddar is (or supposed to be) a powerful, reflective, object-oriented, high-level programming language.

It is currenty in development, to give an approximate idea of how much work has been done, an expression parser is almost finished.

Contributors:

 - @vihanb
 - @somebody

## Milestones

A list of milestones in Cheddar's development:

 1. Expression parsing works
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
    * main {} block to initialize yoour variables
    */
   
   main {
       self.Name := Name
       self.Age  := Age
   }
   
   speak := => "Hello, my name is #{self.Name}, I am #{self.Age} years old"
}


class Dog(String: Name, Int:Age, String:Breed) extends Animal {
    /* super is implicit, but you can
     * explicitly call super using:
     */
    super Name, Age
    
    speak := => "Woof! I am a #{self.Breed} dog, I am #{self.Age} years old and am called #{self.Name}"
}
```
