<p align="center">
  <a href="https://github.com/vihanb/Cheddar">
    <img src="https://raw.githubusercontent.com/vihanb/Cheddar/master/misc/logo_wide.png" alt="Cheddar" width="846">
  </a>
</p>

<p align="center">
  The language that works for you
</p>

<p align="center">
  <a href="https://travis-ci.org/cheddar-lang/Cheddar"><img alt="Travis Status" src="https://travis-ci.org/cheddar-lang/Cheddar.svg?branch=master"></a>
  <a href="https://gitter.im/cheddar-lang/Cheddar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img alt="Join the chat at https://gitter.im/cheddar-lang/Cheddar" src="https://badges.gitter.im/cheddar-lang/Cheddar.svg"></a>
  <a href="https://codeclimate.com/github/cheddar-lang/Cheddar"><img src="https://codeclimate.com/github/cheddar-lang/Cheddar/badges/gpa.svg" /></a>
</p>

## Installation

Simply paste this in your bash console:
```bash
bash <(curl -s cheddar.vihan.org/bashinstall.sh)
```

Ensure you have `node` and `npm` installed. Everything else should be automatically installed.

---


Contributors:

 - @vihanb
 - @somebody
 - @CᴏɴᴏʀO'Bʀɪᴇɴ

### Design Philosophy 

A language should work for you.
You shouldn't work for the language.

## Building

Building is rather simple. After cloning or installing the files, once in the directory simple run `npm install`. The rest should automatically happen.

```bash
npm install
npm WARN prefer global coffee-script@1.10.0 should be installed with -g

> Cheddar@0.2.0 postinstall ./Cheddar
> grunt

Running "babel:dist" (babel) task

Done.
```

Now, when you check the contents of the folder you should notice a `dist/` folder containing the transpiled code. The next section will contain information on running Cheddar (make sure to `cd dist`)

## Using Cheddar

At the moment, only the REPL exists. They are a few REPLs, some for debugging, some for use. They are two REPLs, the main one which you can access using:

```bash
$ node ./interpreter/tests/repl
Cheddar:T_REPL> 
```

Additionally, you can access the scope testing/assignment REPL by calling a slightly different file:
```bash
$ node ./interpreter/tests/t_repl
Cheddar:T_REPL> 
```

# === Development Info ===

## Roadmap

**Tokenizer roadmap excluded.**

 - [x] Define streams
 - [x] Define class structure
 - [x] Define basic runtime enviorment
 - [x] Token linking
 - [x] Call stack handling
 - [x] Define namespaces
 - [x] Handle lookups
 - [x] Define primitive classes
  - [x] String
  - [x] Array
  - [x] Number
  - [x] Boolean
  - [x] Nil
 - [ ] Expression evaluation integration
  - [x] Linking
  - [x] Call stack configuration
  - [x] Scope linking
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
 - [x] Precendence ignored

Bugs:

 - [x] Stack overflowing during various invalid expression syntax
 - [ ] Error handling is completely borked.
  - [ ] Syntax Errors (index & prop data is lost)
  - [x] Runtime Errors

Further Development

 - [ ] JS Interfacing
 - [ ] A bunch of libraries

## Example Programs

To get an idea of how the syntax is going to look, here are examples:

```ruby
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
