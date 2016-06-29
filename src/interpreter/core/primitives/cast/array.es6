import CheddarError from '../../consts/err';
import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (self) => {
        // Get Dependencies
        let CheddarString = require('../String');

        let Stringified = "",
            Cast;
        for (let i = 0; i < self.value.length; i++) {
            Cast = self.value[i].constructor.Cast.has('String') ||
                self.value[i].constructor.Operator.has('repr');
            if (Cast)
                Stringified += (i ? ", " : "") + (
                    self.value[i].constructor.Cast.has('String') ?
                    self.value[i].constructor.Cast.get('String')(self.value[i]) :
                    self.value[i].constructor.Operator.has('repr')(null, self.value[i])
                ).value;
            else
                Stringified += (i ? ", " : "") + `<${self.value[i].constructor.Name}>`;
        }
        return HelperInit(CheddarString, "[" + Stringified + "]");
    }]
]);
