import CheddarVariable from '../interpreter/core/env/var';
import HelperInit from './init';

export default function HelperVariable(Type, Value, Arguments, Implicit = true) {
    return new CheddarVariable(HelperInit(Type, ...Value), Arguments, Implicit);
}