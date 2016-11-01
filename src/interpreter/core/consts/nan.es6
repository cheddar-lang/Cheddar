import CheddarClass from '../env/class';
import HelperInit from '../../../helpers/init';

export default class NAN extends CheddarClass {
    static Name = 'NaN';

    init = () => true;

    Cast = new Map([...CheddarClass.Operator,
        ['String', () => HelperInit(
            require('../primitives/String'),
            'NaN'
        ),
        'Number', () => HelperInit(
            require('../primitives/Number'),
            NaN
        )]
    ]);
}
