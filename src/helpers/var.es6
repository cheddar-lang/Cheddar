import CheddarVariable from '../interpreter/core/env/var';

/*
 * Name - Variable Name
 * Scope - Variable's Scope
 * Type - Variable's Class
 * Value[] - Arguments for initializer
 * Arguments - Supplemtary arguments for variable configuration
 */
export default function HelperVariable(Name, Scope, Type, Value, Arguments) {
    let A = new Type(Scope, Name),
        B;

    if ((B = A.init(...Value)) === true)
        return Scope.set(Name, new CheddarVariable(A, Arguments));
    else
        return B;
}
