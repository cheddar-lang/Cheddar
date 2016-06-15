import CheddarClass from '../env/class';
import CheddarString from '../primitives/String';
import HelperInit from '../../../helpers/init';

export default class NIL extends CheddarClass {
    static Name = "Nil";

    init() {
        return true;
    }

    static Cast = new Map([...CheddarClass.Operator, ['String', () => HelperInit(CheddarString, "Nil")]]);
}