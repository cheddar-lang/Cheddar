# Cheddar

Cheddar is (or supposed to be) a powerful, reflective, object-oriented, high-level programming language.

## Example Programs

To get an idea of how the syntax is going to look, here are examples:

```scala
class Animal(String: Name, Int: Age) {
   Name := Name
   Age  := Age
   
   speak := => "Hello, my name is #{self.Name}, I am #{self.Age} years old"
}


class Dog(String: Name, Int:Age, String:Breed) extends Animal {
    super Name, Age
    Breed := Breed
    
    speak := => "Woof! I am a #{self.Breed} dog, I am #{self.Age} years old and am called #{self.Name}"
}
```