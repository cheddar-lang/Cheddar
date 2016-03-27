# Cheddar

Cheddar is (or supposed to be) a powerful, reflective, object-oriented, high-level programming language.

## Example Programs

The best way to show the language is examples:

---

Classes

```scala
class Animal(String: Name, Int: Age) {
   Name := Name
   Age  := Age
   
   speak => "Hello, my name is #{self.Name}, I am #{self.Age} years old"
}


class Dog(String: Name, Int:Age, String:Breed) {
    super Name, Age
    Breed := Breed
    
    speak => "Woof! I am a #{self.Breed} dog, I am #{self.Age} years old and am called #{self.Name}"
}
```