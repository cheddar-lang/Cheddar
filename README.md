# Cheddar

Cheddar is (or supposed to be) a powerful, reflective, object-oriented, high-level programming language.

It is currenty in development, to give an approximate idea of how much work has been done, an expression parser is almost finished.

Contributors:

 - @vihanb
 - @somebody

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