##To Do List
- [ ] a "Match any literal" thing, which returns the tokens and the class
- [ ] Array Literals - `[literal, literal, literal]`
- [ ] Operator Literals - `:=`, `+`, `<=`, should be greedy matched
- [ ] Variable parser - `foo`, `foo.bar`, `foo.bar(foo.bar())`
- [ ] Expression parser - `foo + foo.bar() * (sqrt 4)`
- [ ] Lambdas - `foo => DoSomething()`, 
`foo -> (bar, baz) DoSomething(bar, baz)`, 
`foo -> (String:bar, Char:baz) DoSomething(bar, baz)` 
- [ ] `infix`, `prefix`, `postfix` keywords to declare operators