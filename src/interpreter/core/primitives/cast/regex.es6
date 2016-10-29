// Standard error
import * as CheddarError from '../../consts/err';

import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (self) => {
        let CheddarString = require('../String');

        return HelperInit(CheddarString, self.source);
    }]
]);
