/*
grammar:

P  -> print P'
P' -> E (, P')*
      ε

where P' denotes a general arg list

*/