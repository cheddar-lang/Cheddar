import CheddarClass from '../env/class';

export default class nil extends CheddarClass {
    static Name = "nil";

    init() { }

    accessor = null;
    setter   = null;
    Scope    = null;

    static accessor = null;
    static setter   = null;
    static Scope    = null;
}