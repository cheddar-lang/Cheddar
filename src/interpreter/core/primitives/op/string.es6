import CheddarError from '../../consts/err';

// == STRING ==
export default new Map([
    // String concatenation
    //  using +, attempt to
    //  implicitly cast
    ['+', (LHS, RHS) => {

        //NOTE: IMPLICIT
        //if (RHS.Cast.has(CheddarString))
        //    RHS = RHS.Cast.get(CheddarString)();

        if (RHS instanceof LHS.constructor)
            return new LHS.constructor(
                RHS.value + LHS.value
            );
        else
            return CheddarError.NO_OP_BEHAVIOR;
    }],

    // String repetition
    //  when either Operator<*>.Behavior
    //  is (String, Number)
    //  or (Number, String)
    //  repeat <String> <Number> times
    ['*', (LHS, RHS) => {

        if (RHS.constructor.Name === "Number")
            return new this.constructor(LHS.value.repeat(RHS.value));
        else
            return CheddarError.NO_OP_BEHAVIOR;

    }]
]);