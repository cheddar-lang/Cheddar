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
