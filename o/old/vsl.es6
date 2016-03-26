////// DEFINE PARSER ELEMENTS
const EOF  = 218;
const NONE = null;

// Character Classes

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const WHITE = "\u0013\u0010\u0009\u0012 ";
const DIGIT = "0123456789";

// Tokenization Part Definitions

const TOKEN   = UPPER + LOWER + "_";
const TOKEN_B = TOKEN + DIGIT;
const TOKEN_C = WHITE /* EOF */;

const VAR = TOKEN + "_";
const VAR_B = VAR + DIGIT;

const OP = "+-*/";

// Declerations

const ___FORMAL = new Map([
  ["TOK_A", TOKEN],
  ["TOK_B", TOKEN],
]);

/*
DEFINITION types

<TOK>  := <TOKEN> -><TOKEN_B><- <TOKEN_C>->
<TYPE> := <TOK>:<__::LEX>

<VARIABLE> := <VAR> -><VAR_B><-

<DEC> := <VARIABLE>
<DEC> := <TYPE>

<ITEM> := <DEC>
<ITEM> := <DEC>()
<ITEM> := <DEC>.<ITEM>

<EXPR> := ( <EXPR> )
<EXPR> := <ITEM> <OP> <ITEM>

<TOK> or <EXPR>
*/

//////////////////// START ////////////////////

/// START DATA
const CODE = `  //`;

// TOKENIZER
let STDERR = "";
let STDLOG = ""; // Debug notes
(function() {

  let ITERATOR = 0;

  // Error handling
  function $ERROR(w, c, r) {
    STDERR += `Compile Error: ${w} at ${c}:${r}\n`;
    ITERATOR = CODE.length;
  }

  function $TOKEN(n, c, r) { // Name, Column, Row
    $ERROR(`Unexpected token "${n}"`, c, r);
  }

  // Code Navigating Functions

  function __JUMP(palette) { // Jump through palette
    STDLOG += `JUMPED from ${ITERATOR}`;
    while (ITERATOR < CODE.length && palette.indexOf(CODE[ITERATOR]) > -1) ITERATOR++;
    STDLOG += ` to ${ITERATOR}\n`;
  }

  function __SKIP(pa, pb, s) { // Returns between a two paritions
    if (CODE.slice(ITERATOR).indexOf(pa) === 0) {
      ITERATOR += pa.length; // JUMP
      do {
        if (ITERATOR < CODE.length) {
          ITERATOR++;
        } else {
          if (s !== EOF) {
            let _DIST = CODE.slice(0, ITERATOR);
            $TOKEN("EOF", ITERATOR - (_DIST.lastIndexOf("\n")), _DIST.split("\n").length);
          } else {
            STDLOG += "SKIPED to EOF";
          }
          break;
        }
      } while (CODE.slice(ITERATOR).indexOf(pa) !== 0);
    } else {
      STDLOG += `Jumped __SKIP at ${ITERATOR}\n`;
    }
  }

  ////// TOKENIZATION DEFINITIONS /////

  class ___REGISTER {

    // Class Register
    // Creates Parse Register

    constructor(FORM, ...NEST) {

      this.FORM = FORM;
      this.REGISTER = new RegExp(
        FORM
        .replace(/<([A-Za-z_]+?)>/g,(_, DATA) => ___FORMAL.get(DATA)
                 .replace(/\\/g, "\\\\")
                 .replace(/]/g, "\\]") )
        .replace(/<<(\d+)>>/g, (_, DATA) => NEST[DATA])
      );
    }

    // Handle resister checking

    toString() { return this.FORM }
  }
  
  
  function __EXPRESSION() {
    
    __JUMP(WHITE);
    const __E_OP = "+-*/";
    //const __EOP
    
  }

  
  function __MATCH(REGISTER) {

    // for item in expand(register) {
    //   switch typeof item {
    //     case string:
    //       <= [item]
    //     case array:
    //       <= item[1]<item[0]>
    //   }
    // }

    if (REGISTER instanceof ___REGISTER) { // Register?

      // Get jump register
      const JUMP = REGISTER.REGISTER;
      
      // Set jump resgister
      

    } else {

      // Invalid parse register
      // Internal error

      $ERROR("Invalid Register", "INT", "INT::REGISTER");

    }

  }
  
  
  class Lexer {
    
    constructor(i, code) {
      
      this.i = i;
      this.Code = code;
      
      this.Out = [];
      
    }
    
    // Retrieve current char at index
    // Lexer..get
    get get() { return this.Code[ this.i ] }
    
    
    // Stores `..get`
    // Lexer..Out <- Lexer..get
    keep() { this.Out.push(this.get) }
    
    // Closes lexer register
    // 
    close() {
      
    }
    
  }
  
  

  for (; ITERATOR < CODE.length; ITERATOR++) {
    ///// LEVELED CORE /////
    const ____STREAM = { IN: 1, OUT: 2, ERR: 3 };

    ///// PREPROCCESSING /////

    // Align to Tokeen

    __JUMP(WHITE);

    // Comment Jumps

    __SKIP("/*", "*/", EOF);
    __SKIP("//", "\n", EOF);
    __SKIP("#" , "\n", EOF);

    ////// DEFIINITION //////
    
    // Expression Definition
    
    const ___T_STR = new ___REGISTER();

    // Tokens
    const ___TOK  = new ___REGISTER(`[<TOKEN>][<TOK_B>]*`)
    const ___TYPE = new ___REGISTER(`<<0>>`, ___TOK)
    
    
    
    // NOTE: syntax is still currently being descided
    // const ___TOK  = ___REGISTER([TOKEN, ["*", TOK_B]]);
    // const ___TYPE = ___REGISTER([___TOK, ":", ["//", "LEXOGRAPHIC DEFINITION"]]);

    __MATCH(___TOK);

    // OPEN
  }
}());


/////////// LEVELED DEFINITIONS ///////////

///
// == LEXICAL TYPES ==
// Expression
// Variable
// Closure
//
///
//__MACRO__("if", ___MACROSTATE([ ___EXPRESSION, ___CLOSURE ]), (E, C) => { })
//__MACRO__("def", ___MACROSTATE([ ___VARIABLE, ___TYPE ]), (V, T) => { })
//__MACRO__("while", ___MACROSTATE([ ___EXPRESSION, ___CLOSURE ]), (E, C) => { })